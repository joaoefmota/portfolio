import database from "../database";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from "express";
import { getPlaygroundById } from "./playground_handlers";
import { TypedRequestQuery } from "../../types/express";
const fs = require("fs"); // to rename files, for example

const ADMIN = process.env.ADMIN;

interface AuthenticatedRequest extends Request {
  payload: {
    sub: string;
  };
}

const dataError = "Error retrieving data from the database";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const [query] = await database.query("SELECT * FROM projects");
    res.status(200).json(query);
  } catch (err) {
    console.error(err);
    res.status(500).send(dataError);
  }
};

export const getProjectByName = async (
  req: TypedRequestQuery<{ name: string }>,
  res: Response
) => {
  const { name } = req.query;
  try {
    const [query] = await database.query(
      "SELECT * FROM projects WHERE name=?",
      [name]
    );
    res.status(200).json(query);
  } catch (err) {
    console.error(err);
    res.status(500).send(dataError);
  }
};

export const getProjectById = async (
  req: TypedRequestQuery<{ id: number }>,
  res: Response
) => {
  const id = req.query.id;
  try {
    const [query] = await database.query("SELECT * FROM projects WHERE id=?", [
      id,
    ]);
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

export const postProject = async (req: Request, res: Response) => {
  const {
    project_id,
    name,
    subTitle,
    content,
    lg_content1,
    lg_content2,
    tools,
    packages,
    link,
    github,
    aka,
  } = req.body;

  if (
    name == null ||
    project_id == null ||
    content == null ||
    tools === null ||
    link === null ||
    github === null ||
    subTitle === null ||
    lg_content1 === null ||
    aka === null ||
    lg_content2 === null
  ) {
    return res.status(401).send({ error: "Incorrect values" });
  }

  const existsQuery = "SELECT * FROM projects WHERE project_id =? OR name = ?";
  const [rows] = await database.query(existsQuery, [project_id, name]);
  const rowDataPacket = rows as RowDataPacket[];
  if (rowDataPacket.length !== 0) {
    const {
      exists,
      project_id: existingProjectId,
      name: existingName,
    } = rowDataPacket[0];

    if (exists && existingProjectId === project_id) {
      return res.status(400).send({ error: "Project id already exists" });
    } else if (exists && existingName === name) {
      return res
        .status(400)
        .send({ error: "Name of the project already exists" });
    }
  }

  try {
    const [query] = await database.query<OkPacket>(
      "INSERT INTO projects (project_id, name, subTitle, content, lg_content1, lg_content2, tools, packages, link, github, aka) VALUES  (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        project_id,
        name,
        subTitle,
        content,
        lg_content1,
        lg_content2,
        tools,
        packages,
        link,
        github,
        aka,
      ]
    );
    const insertId: number = query.insertId;
    res.location(`./api/projects/${insertId}`).sendStatus(201);
    fs.mkdirSync(`src/images/projects/${name}`);
  } catch (err: any) {
    if ((err.code = "ERR_DUP_ENTRY")) {
      console.log(err);
      res.status(500).send(`The project with name: ${name} already exists`);
    } else {
      console.log(err);
      res.status(500).send(dataError);
    }
  }
};

export const deleteProjectById = async (
  req: Request | TypedRequestQuery<{ name: string; project_id: number }>,
  res: Response
) => {
  const id = req.query.project_id;
  const payloadSub: string = (req as AuthenticatedRequest).payload.sub;
  // console.log("reqPayload", payloadSub);

  if (payloadSub !== ADMIN) {
    res.status(403).send("Forbidden");
    return;
  }

  try {
    const [query] = await database.query(
      "DELETE FROM projects WHERE project_id=?",
      [id]
    );
    const result = query as OkPacket;
    if (result.affectedRows === 0) {
      res.status(404).send("Not found");
    } else {
      res.status(204).send("Project deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(dataError);
  }
};
