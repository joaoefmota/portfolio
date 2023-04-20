import { Request, Response } from "express";
import { OkPacket, RowDataPacket } from "mysql2";
import database from "../database";
import { v4 as uuidv4 } from "uuid";
import { TypedRequestQuery } from "../../types/express";

const dataError = "Error retrieving data from the database";

const ADMIN = process.env.ADMIN;

export interface ImageCountainer extends RowDataPacket {
  [field: string]: any;
}

interface AuthenticatedRequest extends Request {
  payload: {
    sub: string;
  };
}

export const getAllPlayground = async (req: Request, res: Response) => {
  try {
    const [query] = await database.query("SELECT * FROM playground");
    res.status(200).json(query);
  } catch (err) {
    console.error(err);
    res.status(500).send(dataError);
  }
};

export const getPlaygroundById = async (
  req: TypedRequestQuery<{ id: number }>,
  res: Response
) => {
  const id = req.query.id;
  try {
    const [query] = await database.query(
      "SELECT * FROM playground WHERE playground_id=?",
      [id]
    );
    if (query != null) {
      res.status(200).json(query);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(dataError);
  }
};

export const postPlayground = async (req: Request, res: Response) => {
  const { playground_id, name, content, tools, link } = req.body;
  if (
    playground_id == null ||
    name == null ||
    content == null ||
    tools === null ||
    link === null
  ) {
    return res.status(401).send({ error: "Incorrect values" });
  }

  const existsQuery =
    "SELECT * from playground WHERE playground_id = ? OR name = ?";
  const [rows] = await database.query(existsQuery, [playground_id, name]);
  const rowDataPacket = rows as RowDataPacket[];
  if (rowDataPacket.length != 0) {
    const {
      exists,
      playground_id: existingPlaygroundId,
      name: existingName,
    } = rowDataPacket[0];

    if (exists && existingPlaygroundId === playground_id) {
      return res.status(400).send({ error: "Playground id already exists" });
    } else if (exists && existingName === name) {
      return res
        .status(400)
        .send({ error: "Name of the playground already exists" });
    }
  }

  try {
    const [query] = await database.query<OkPacket>(
      "INSERT INTO playground (playground_id, name, content, tools, link) VALUES (?, ?, ?, ?, ?)",
      [playground_id, name, content, tools, link]
    );
    const insertId: number = query.insertId;
    res.location(`./api/playground/${insertId}`).sendStatus(201);
  } catch (err: any) {
    if ((err.code = "ERR:DUP_ENTRY")) {
      res.status(500).send(`The playground with ${name} already exists`);
    } else {
      console.log(err);
      res.status(500).send(dataError);
    }
  }
};

export const putPlayground = async (req: Request, res: Response) => {
  const id = req.query.id;
  const payloadSub: string = (req as AuthenticatedRequest).payload.sub;

  function isValidUUID(id: string | undefined): boolean {
    if (!id) {
      return false;
    }
    const uuidRegex = new RegExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
    return uuidRegex.test(id);
  }

  if (payloadSub !== id) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }

  const { name, content, tools, link } = req.body;
  if (!name || !content || !tools || !link) {
    res.status(400).send({ error: "Missing input data" });
    return;
  }

  try {
    const databaseQuery =
      "UPDATE playground SET name=?, content=?, tools=?, link=? WHERE playground_id=?";
    const [query] = await database.query(databaseQuery, [
      name,
      content,
      tools,
      link,
      id,
    ]);
    const result = query as OkPacket;
    if (result.affectedRows === 0) {
      res.status(404).send({ error: "Not found" });
    } else {
      res.status(204).send("Playground deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(dataError);
  }
};

export const deletePlayground = async (req: Request, res: Response) => {
  const id = req.query.id;
  const payloadSub: string = (req as AuthenticatedRequest).payload.sub;
  console.log("playload sub", payloadSub);
  if (payloadSub != ADMIN) {
    res.status(403).send("Forbidden");
    return;
  }

  try {
    const [query] = await database.query(
      "DELETE FROM playground WHERE playground_id=?",
      [id]
    );
    const result = query as OkPacket;
    if (result.affectedRows === 0) {
      res.status(404).send("Not found");
    } else {
      res.status(204).send("Playground updated");
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).send(dataError);
  }
};
