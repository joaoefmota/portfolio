"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const authorizationHeader = req.get("Authorization");
        if (authorizationHeader == null) {
            throw new Error("Authorization header is missing");
        }
        const [type, token] = authorizationHeader.split(" ");
        if (type !== "Bearer") {
            throw new Error("Authorization header has not the 'Bearer' type");
        }
        req.payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).send("Unauthorized");
    }
};
exports.verifyToken = verifyToken;
// Middleware error handler
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal server error");
};
exports.errorHandler = errorHandler;
{
    /*
  
  import { Request, Response, NextFunction } from "express";
  import jwt from "jsonwebtoken";
  
  export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorizationHeader = req.get("Authorization");
  
      if (!authorizationHeader) {
        throw new Error("Authorization header is missing");
      }
  
      const [type, token] = authorizationHeader.split(" ");
  
      if (type !== "Bearer") {
        throw new Error("Authorization header has not the 'Bearer' type");
      }
  
      req.payload = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).send("Invalid token");
      }
  
      next(err);
    }
  };
  
  // Middleware error handler
  export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.status(500).send("Internal server error");
  };
  
  */
}
