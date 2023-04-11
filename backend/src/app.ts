import express from "express";
import dotenv from "dotenv";
import database from "./database";
import cors from "cors";
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

import MainRouter from "./routers/mainrouter";

dotenv.config();

const EXPRESS_PORT = process.env.PORT || 5005;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.listen(EXPRESS_PORT, () => {
  if (database.getConnection() === null) {
    console.error("Warning: database connection failed");
    process.exit(1);
  }
  console.log("Express listening on port: http://localhost:", EXPRESS_PORT);
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", MainRouter);
