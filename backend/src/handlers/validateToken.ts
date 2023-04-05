import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const validateToken = (req: Request, res: Response) => {
  const token = req.query.token as string;
  console.log("token", token);

  if (!token) {
    res.status(401).send("Token missing");
    return;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      exp: number;
    };
    const currentTimestamp = Date.now() / 1000;

    if (decodedToken.exp < currentTimestamp) {
      res.status(401).send("Token expired");
    } else {
      res.status(200).send("Token valid");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
