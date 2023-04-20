"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContactForm = void 0;
const database_1 = __importDefault(require("../database"));
const transporter_1 = __importDefault(require("../transporter"));
const submitContactForm = (req, res) => {
    const { first_name, last_name, email, message } = req.body;
    database_1.default
        .query("INSERT INTO contact (first_name, last_name, email, message) VALUES (?, ?, ?, ?)", [first_name, last_name, email, message])
        .then(([result]) => {
        if (result.affectedRows === 0) {
            res.status(400).send("Message not submited");
        }
        else {
            const newMessage = result.insertId;
            res.status(201).json(newMessage.toString());
        }
    });
    const mailOptions = {
        from: email,
        to: `joaoefmota@hotmail.com`,
        subject: "New message from contact form",
        text: `${message} \n\n Name: ${first_name} \n\n Surname: ${last_name} \n\n Email: ${email}`,
        html: `<p>${message}</p> <p>Name: ${first_name}</p> <p>Surname: ${last_name}</p> <p>Email: ${email}</p>`,
    };
    transporter_1.default
        .sendMail(mailOptions)
        .then((info) => {
        console.warn(info);
    })
        .catch((err) => {
        console.warn(err);
    });
};
exports.submitContactForm = submitContactForm;
