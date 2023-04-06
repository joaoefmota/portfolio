"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const database_1 = __importDefault(require("../database"));
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloadSub = req.payload.sub;
    const username = payloadSub;
    // console.log("Username Payload", username);
    try {
        const [query] = yield database_1.default.query("SELECT * FROM users WHERE username = ?", [username]);
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
    }
    catch (err) {
        console.error(err);
        res.status(500).send("No data was received");
    }
});
exports.dashboard = dashboard;
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
