import { Request, Response } from "express";
import database from "../database";
import argon2 = require("argon2");
import { OkPacket, RowDataPacket, FieldPacket } from "mysql2";
import jwt from "jsonwebtoken";
import { TypedRequestQuery } from "../../types/express";

const ADMIN = process.env.ADMIN;

interface AuthenticatedRequest extends Request {
  payload: {
    sub: string;
  };
}

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, user_id } = req.body;

  if (
    email == null ||
    username == null ||
    password == null ||
    user_id === null
  ) {
    return res.status(401).send({ error: "Incorrect credentials" });
  }

  const existsQuery =
    "SELECT * FROM users WHERE username = ? OR email=? OR user_id=?";
  const [rows] = await database.query(existsQuery, [username, email, user_id]);
  const rowDataPacket = rows as RowDataPacket[];
  if (rowDataPacket.length != 0) {
    const {
      username: existsUserName,
      email: existsEmail,
      user_id: existsUserId,
    } = rowDataPacket[0];

    if (existsEmail === email) {
      return res.status(400).send({ error: "Email already exists" });
    } else if (existsUserName === username) {
      return res.status(400).send({ error: "Username already exists" });
    } else if (existsUserId === user_id) {
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

  // console.log("hashedPassword", hashedPassword); //WTF????

  const result = await database
    .query<OkPacket>(
      "INSERT INTO users (email, username, hashedPassword, user_id) VALUES (?, ?, ?, ?)",
      [email, username, req.body.hashedPassword, user_id]
    )
    .then((result: [OkPacket, FieldPacket[]]) => {
      const insertId: number = result[0].insertId;
      res.location(`./api/users/${insertId}`).sendStatus(201);
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
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    res.status(403).json({validationErros: "Incomplete credentials"});
    return;
  }

  const user = await database
    .query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ? AND email =?",
      [username, email]
    )
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
        const payload: { sub: string } = { sub: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
        delete user.hashedPassword;
        res.json({ token, user });
        return;
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((err: string) => {
      console.error(err);
      res.status(500).send("Server error. Unable to process request.");
    });
};

export const getUserById = async (
  req: TypedRequestQuery<{ user_id: number }>,
  res: Response
) => {
  const id = req.query.user_id;

  try {
    const [query] = await database.query(
      "SELECT * FROM users WHERE user_id=?",
      [id]
    );
    if (query != null) {
      res.status(200).json(query);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const deleteUserById = async (
  req: Request | TypedRequestQuery<{ username: string; user_id: number }>,
  res: Response
) => {
  const id = req.query.user_id;
  const payloadSub: string = (req as AuthenticatedRequest).payload.sub;
  console.log("reqPayload", payloadSub);

  if (payloadSub !== ADMIN) {
    res.status(403).send("Forbidden");
    return;
  }
  try {
    const [query] = await database.query("DELETE FROM users WHERE user_id=?", [
      id,
    ]);
    const result = query as OkPacket;
    if (result.affectedRows === 0) {
      res.status(404).send("Not found");
    } else {
      res.status(204).send("User deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
