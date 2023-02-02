import database from "../database";
import { RowDataPacket } from "mysql2";
import express, { Request, Response } from "express";

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
  req: TypedRequestQuery<{ name: string; id: number }>,
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
