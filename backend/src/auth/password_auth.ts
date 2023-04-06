import { Request, Response } from "express";
import argon2 = require("argon2");
import jwt from "jsonwebtoken";
import { RequestUser } from "../../types/express";

export const verifyPassword = (req: RequestUser, res: Response) => {
  argon2
    .verify(req.user.hashedPassword!, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
          expiresIn: "1h",
        });

        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
