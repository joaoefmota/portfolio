"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.getUserById = exports.loginUser = exports.createUser = void 0;
const database_1 = __importDefault(require("../database"));
const argon2 = require("argon2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ADMIN = process.env.ADMIN;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, user_id } = req.body;
    if (email == null ||
        username == null ||
        password == null ||
        user_id === null) {
        return res.status(401).send({ error: "Incorrect credentials" });
    }
    const existsQuery = "SELECT * FROM users WHERE username = ? OR email=? OR user_id=?";
    const [rows] = yield database_1.default.query(existsQuery, [username, email, user_id]);
    const rowDataPacket = rows;
    if (rowDataPacket.length != 0) {
        const { username: existsUserName, email: existsEmail, user_id: existsUserId, } = rowDataPacket[0];
        if (existsEmail === email) {
            return res.status(400).send({ error: "Email already exists" });
        }
        else if (existsUserName === username) {
            return res.status(400).send({ error: "Username already exists" });
        }
        else if (existsUserId === user_id) {
            return res.status(400).send({ error: "User id already exists" });
        }
    }
    const hashingOptions = {
        type: argon2.argon2d,
        memoryCost: 2 ** 16,
        hashLength: 50,
        timeCost: 5,
        paralellism: 1,
    };
    const hashedPassword = yield argon2
        .hash(password, hashingOptions)
        .then((hash) => {
        console.log(hash);
        req.body.hashedPassword = hash;
        delete req.body.password;
        return hash;
    })
        .catch((error) => {
        console.error(error);
    });
    // console.log("hashedPassword", hashedPassword); //WTF????
    const result = yield database_1.default
        .query("INSERT INTO users (email, username, hashedPassword, user_id) VALUES (?, ?, ?, ?)", [email, username, req.body.hashedPassword, user_id])
        .then((result) => {
        const insertId = result[0].insertId;
        res.location(`./api/users/${insertId}`).sendStatus(201);
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send("Error updating users database");
    });
    return {
        result,
    };
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        res.status(403).json({ validationErros: "Incomplete credentials" });
        return;
    }
    const user = yield database_1.default
        .query("SELECT * FROM users WHERE username = ? AND email =?", [username, email])
        .then(([result]) => {
        if (result.length === 0)
            return undefined;
        return result[0];
    });
    if (user == null) {
        res.status(403).send("Wrong credentials.");
        return;
    }
    argon2
        .verify(user.hashedPassword, password)
        .then((isCorrect) => {
        if (isCorrect) {
            const payload = { sub: user.username };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            delete user.hashedPassword;
            res.json({ token, user });
            return;
        }
        else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    })
        .catch((err) => {
        console.error(err);
        res.status(500).send("Server error. Unable to process request.");
    });
});
exports.loginUser = loginUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.user_id;
    try {
        const [query] = yield database_1.default.query("SELECT * FROM users WHERE user_id=?", [id]);
        if (query != null) {
            res.status(200).json(query);
        }
        else {
            res.status(404).send("Project not found");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
exports.getUserById = getUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.user_id;
    const payloadSub = req.payload.sub;
    console.log("reqPayload", payloadSub);
    if (payloadSub !== ADMIN) {
        res.status(403).send("Forbidden");
        return;
    }
    try {
        const [query] = yield database_1.default.query("DELETE FROM users WHERE user_id=?", [
            id,
        ]);
        const result = query;
        if (result.affectedRows === 0) {
            res.status(404).send("Not found");
        }
        else {
            res.status(204).send("User deleted");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
exports.deleteUserById = deleteUserById;
