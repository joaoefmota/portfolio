import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import database from "../database";
import { TypedRequestQuery } from "../../types/express";

const dataError = "Error retrieving data from the database";
export interface ImageCountainer extends RowDataPacket {
  [field: string]: any;
}

export const getImages = (
  req: TypedRequestQuery<{ project: string }>,
  res: Response
) => {
  const { project } = req.query;
  database
    .query<ImageCountainer[]>(
      "SELECT i.src AS source, i.image_id as id FROM images AS i INNER JOIN projects AS p ON i.project_id=p.project_id WHERE p.name=?",
      [project]
    )
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(dataError);
    });
};

export const getImagesById = (
  req: TypedRequestQuery<{ project: string, image_id: number }>,
  res: Response
) => {
  const { project, image_id } = req.query;
  database
    .query<ImageCountainer[]>(
      "SELECT i.src AS source FROM images AS i INNER JOIN projects AS p ON i.project_id=p.id WHERE p.name=? AND i.image_id=?",
      [project, image_id]
    )
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(dataError);
    });
};
