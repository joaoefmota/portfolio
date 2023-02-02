import { Request, Response } from "express";
import database from "../database";
import { OkPacket } from "mysql2";

export const submitContactForm = (req, res) => {
  const { first_name, last_name, email, message } = req.body;
  database
    .query<OkPacket>(
      "INSERT INTO contact (first_name, last_name, email, message) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, message]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(400).send("Message not submited");
      } else {
        const newMessage = result.insertId;
        res.status(201).json(newMessage.toString());
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};
