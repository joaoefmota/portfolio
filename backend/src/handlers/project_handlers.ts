import database from "../database";
import { OkPacket, FieldPacket } from "mysql2";
import { Request, Response } from "express";
const fs = require("fs"); // to rename files, for example

const dataError = "Error retrieving data from the database";

export const getAllProjects = (req: Request, res: Response) => {
  database
    .query("SELECT * FROM projects")
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(dataError);
    });
};

export const getProjectByName = (
  req: TypedRequestQuery<{ name: string }>,
  res: Response
) => {
  const { name } = req.query;
  database
    .query("SELECT * FROM projects WHERE name=?", [name])
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(dataError);
    });
};

export const getProjectById = (
  req: TypedRequestQuery<{ id: number }>,
  res: Response
) => {
  const id = req.query.id;
  database
    .query("SELECT * FROM projects WHERE id=?", [id])
    .then((result) => {
      if (result[0] != null) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Project not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(dataError);
    });
};

export const postProject = (req: Request, res: Response) => {
  const {
    name,
    image_id,
    content,
    tools,
    link,
    packages,
    github,
    subTitle,
    lg_content1,
    aka,
    lg_content2,
    project_id,
  } = req.body;
  database
    .query<OkPacket>(
      "INSERT INTO projects (name, image_id, content, tools, link, packages, github, subTitle, lg_content1, aka, lg_content2, project_id) VALUES  (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        image_id,
        content,
        tools,
        link,
        packages,
        github,
        subTitle,
        lg_content1,
        aka,
        lg_content2,
        project_id,
      ]
    )
    .then((result: [OkPacket, FieldPacket[]]) => {
      const insertId: number = result[0].insertId;
      res.location(`./api/projects/${insertId}`).sendStatus(201);
      fs.mkdirSync(`src/images/projects/${name}`);
    })
    .catch((err) => {
      if ((err.code = "ERR_DUP_ENTRY")) {
        res.status(500).send(`The project with email: ${name} already exists`);
      } else {
        console.log(err);
        res.status(500).send("Error updating projects database");
      }
    });
};

export const deleteProjectById = (
  req: TypedRequestQuery<{ name: string; project_id: number }>,
  res: Response
) => {
  const id = req.query.project_id;
  database
    .query("DELETE FROM projects WHERE id=?", [id])
    .then((result) => {
      if (result[0] != null) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Project not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(dataError);
    });
};
