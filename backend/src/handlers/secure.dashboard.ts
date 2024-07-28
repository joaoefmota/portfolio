import { Request, Response } from "express";
import database from "../database";
import { RowDataPacket } from "mysql2";

interface AuthenticatedRequest extends Request {
  payload: {
    sub: string;
  };
}

export const dashboard = async (req: Request, res: Response) => {
  const { sub: username } = (req as AuthenticatedRequest).payload;
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