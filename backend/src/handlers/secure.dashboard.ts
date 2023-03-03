import { Request, Response } from "express";
import database from "../database";
import { RowDataPacket } from "mysql2";

interface AuthenticatedRequest extends Request {
  payload: {
    sub: string;
  };
}

export const dashboard = async (req: Request, res: Response) => {
  const payloadSub: string = (req as AuthenticatedRequest).payload.sub;
  const username = payloadSub;
  // console.log("Username Payload", username);
  try {
    const [query] = await database.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (!query) {
      res.status(404).send("User not found");
      return;
    }

    const [user] = query;
    console.log("USER", user);
    res.status(200).send({
      accountName: user.username,
      email: user.email,
      user_id: user.user_id,
      hashedPassword: user.hashedPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("No data was received");
  }
};

{
  /* 
Redundant verify token 

import { Request, Response } from "express";
import database from "../database";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

export const dashboard = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).send("Unauthorized");
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
      const username = decodedToken.sub;
  
      database
        .query<RowDataPacket[]>("SELECT * FROM users WHERE username = ?", [username])
        .then(([data]) => {
          if (!data) {
            return res.status(404).send("User not found");
          }
  
          const [user] = data;
          return res.status(200).send({ accountName: user.username });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).send("An error occurred while querying the database.");
        });
    } catch (err) {
      console.error(err);
      return res.status(401).send("Unauthorized");
    }
  };


*/
}
