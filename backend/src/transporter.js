"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_SENDIN,
    port: Number(process.env.SMTP_PORT_SENDIN) || 25,
    secure: false,
    auth: {
        user: process.env.SMTP_SENDIN_USER,
        pass: process.env.SMTP_SENDIN_PASSWORD,
    },
});
exports.default = transporter;
