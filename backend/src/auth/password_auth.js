"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = void 0;
const argon2 = require("argon2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyPassword = (req, res) => {
    argon2
        .verify(req.user.hashedPassword, req.body.password)
        .then((isVerified) => {
        if (isVerified) {
            const payload = { sub: req.user.id };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            delete req.user.hashedPassword;
            res.send({ token, user: req.user });
        }
        else {
            res.sendStatus(401);
        }
    })
        .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};
exports.verifyPassword = verifyPassword;
