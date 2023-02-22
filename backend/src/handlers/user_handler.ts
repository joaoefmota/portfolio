import { Request, Response } from "express";
import database from "../database";
import argon2 = require("argon2");
import { OkPacket, RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import { hash } from "argon2";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (email == null || username == null || password == null) {
    return res.status(401).send({ error: "Incorrect credentials" });
  }

  const emailExists = await database
    .query<RowDataPacket[]>("SELECT email FROM users WHERE email = ?", [email])
    .then(([rows]) => {
      if (rows.length > 0) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.error(error);
    });

  if (emailExists) {
    return res.status(400).send({ error: "Email already exists" });
  }

  const userExists = await database
    .query<RowDataPacket[]>("SELECT email FROM users WHERE username = ?", [
      username,
    ])
    .then(([rows]) => {
      if (rows.length > 0) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.error(error);
    });

  if (userExists) {
    return res.status(400).send({ error: "User already exists" });
  }

  const hashingOptions = {
    type: argon2.argon2d,
    memoryCost: 2 ** 16,
    hashLength: 50,
    timeCost: 5,
    paralellism: 1,
  };

  const hashedPassword = await argon2
    .hash(password, hashingOptions)
    .then((hash: any) => {
      console.log(hash);
      req.body.hashedPassword = hash;
      delete req.body.password;
      return hash;
    })
    .catch((error: any) => {
      console.error(error);
    });

  console.log("hashedPassword", hashedPassword); //WTF????

  const result = await database
    .query<OkPacket>(
      "INSERT INTO users (email, username, hashedPassword) VALUES (?, ?, ?)",
      [email, username, req.body.hashedPassword]
    )
    .then((result) => {
      res.location(`./api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating users database");
    });

  return {
    result,
  };
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(403).send("Incomplete credentials");
    return;
  }

  const user = await database
    .query<RowDataPacket[]>("SELECT * FROM users WHERE username = ?", [
      username,
    ])
    .then(([result]) => {
      if (result.length === 0) return undefined;
      return result[0];
    });

  if (user == null) {
    res.status(403).send("Wrong credentials.");
    return;
  }

  argon2
    .verify(user.hashedPassword, password)
    .then((isCorrect: any) => {
      if (isCorrect) {
        const payload = { sub: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
        delete user.hashedPassword;
        res.json({ token, user });
        return;
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err: string) => {
      console.error(err);
      res.sendStatus(500);
    });
};
