{/* OLD CODE */}
import { Request, Response } from "express";
import database from "../database";
const argon2 = require("argon2");
import { OkPacket } from "mysql2";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (email == null || username == null || password == null) {
    return res.status(401).send({ error: "Incorrect credentials" });
  }

  const options = {
    memoryCost: 2048,
    timeCost: 4,
    parallelism: 8,
  };

  const hashedPassword = await argon2
    .hash(password, options)
    .then((hash: any) => {
      console.log(hash);
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
    })
    .catch((error: any) => {
      console.error(error);
    });

  const result = await database
    .query<OkPacket>(
      "INSERT INTO users (email, username, hashedPassword) VALUES (?, ?, ?)",
      [email, username, hashedPassword]
    )
    .then((result) => {
      res.location(`./api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      if ((err.code = "ERR_DUP_ENTRY")) {
        res.status(500).send(`The user with email: ${email} already exists`);
      } else {
        console.log(err);
        res.status(500).send("Error updating users database");
      }
    });

  return {
    result,
  };
};
