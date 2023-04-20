"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res) => {
    const token = req.query.token;
    console.log("token", token);
    if (!token) {
        res.status(401).send("Token missing");
        return;
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const currentTimestamp = Date.now() / 1000;
        if (decodedToken.exp < currentTimestamp) {
            res.status(401).send("Token expired");
        }
        else {
            res.status(200).send("Token valid");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
exports.validateToken = validateToken;
