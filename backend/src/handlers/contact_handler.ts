import { Request, Response } from "express";
import database from "../database";
import transporter from "../transporter";
import { OkPacket } from "mysql2";

export const submitContactForm = (req: Request, res: Response) => {
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
    });

  const mailOptions = {
    from: email,
    to: `joaoefmota@hotmail.com`, // this is the address to which the email will be sent
    subject: "New message from contact form",
    text: `${message} \n\n Name: ${first_name} \n\n Surname: ${last_name} \n\n Email: ${email}`,
    html: `<p>${message}</p> <p>Name: ${first_name}</p> <p>Surname: ${last_name}</p> <p>Email: ${email}</p>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.warn(info);
      
    })
    .catch((err) => {
      console.warn(err);      
    });
};
