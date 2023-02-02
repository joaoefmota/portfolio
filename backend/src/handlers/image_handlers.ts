import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import database from "../database";

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
      "SELECT i.src AS source, p.name AS name FROM images AS i INNER JOIN projects AS p ON i.id=p.image_id WHERE p.name=?",
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
