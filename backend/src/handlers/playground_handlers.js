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
exports.deletePlayground = exports.putPlayground = exports.postPlayground = exports.getPlaygroundById = exports.getAllPlayground = void 0;
const database_1 = __importDefault(require("../database"));
const dataError = "Error retrieving data from the database";
const ADMIN = process.env.ADMIN;
const getAllPlayground = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [query] = yield database_1.default.query("SELECT * FROM playground");
        res.status(200).json(query);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.getAllPlayground = getAllPlayground;
const getPlaygroundById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const [query] = yield database_1.default.query("SELECT * FROM playground WHERE playground_id=?", [id]);
        if (query != null) {
            res.status(200).json(query);
        }
        else {
            res.status(404).send("Project not found");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.getPlaygroundById = getPlaygroundById;
const postPlayground = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playground_id, name, content, tools, link } = req.body;
    if (playground_id == null ||
        name == null ||
        content == null ||
        tools === null ||
        link === null) {
        return res.status(401).send({ error: "Incorrect values" });
    }
    const existsQuery = "SELECT * from playground WHERE playground_id = ? OR name = ?";
    const [rows] = yield database_1.default.query(existsQuery, [playground_id, name]);
    const rowDataPacket = rows;
    if (rowDataPacket.length != 0) {
        const { exists, playground_id: existingPlaygroundId, name: existingName, } = rowDataPacket[0];
        if (exists && existingPlaygroundId === playground_id) {
            return res.status(400).send({ error: "Playground id already exists" });
        }
        else if (exists && existingName === name) {
            return res
                .status(400)
                .send({ error: "Name of the playground already exists" });
        }
    }
    try {
        const [query] = yield database_1.default.query("INSERT INTO playground (playground_id, name, content, tools, link) VALUES (?, ?, ?, ?, ?)", [playground_id, name, content, tools, link]);
        const insertId = query.insertId;
        res.location(`./api/playground/${insertId}`).sendStatus(201);
    }
    catch (err) {
        if ((err.code = "ERR:DUP_ENTRY")) {
            res.status(500).send(`The playground with ${name} already exists`);
        }
        else {
            console.log(err);
            res.status(500).send(dataError);
        }
    }
});
exports.postPlayground = postPlayground;
const putPlayground = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const payloadSub = req.payload.sub;
    function isValidUUID(id) {
        if (!id) {
            return false;
        }
        const uuidRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
        return uuidRegex.test(id);
    }
    if (payloadSub !== id) {
        res.status(401).send({ error: "Unauthorized" });
        return;
    }
    const { name, content, tools, link } = req.body;
    if (!name || !content || !tools || !link) {
        res.status(400).send({ error: "Missing input data" });
        return;
    }
    try {
        const databaseQuery = "UPDATE playground SET name=?, content=?, tools=?, link=? WHERE playground_id=?";
        const [query] = yield database_1.default.query(databaseQuery, [
            name,
            content,
            tools,
            link,
            id,
        ]);
        const result = query;
        if (result.affectedRows === 0) {
            res.status(404).send({ error: "Not found" });
        }
        else {
            res.status(204).send("Playground deleted");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.putPlayground = putPlayground;
const deletePlayground = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const payloadSub = req.payload.sub;
    console.log("playload sub", payloadSub);
    if (payloadSub != ADMIN) {
        res.status(403).send("Forbidden");
        return;
    }
    try {
        const [query] = yield database_1.default.query("DELETE FROM playground WHERE playground_id=?", [id]);
        const result = query;
        if (result.affectedRows === 0) {
            res.status(404).send("Not found");
        }
        else {
            res.status(204).send("Playground updated");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(dataError);
    }
});
exports.deletePlayground = deletePlayground;
