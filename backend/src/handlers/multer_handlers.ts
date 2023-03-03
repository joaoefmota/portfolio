import { Request, Response } from "express";
import multer from "multer";
import database from "../database";
const fs = require("fs"); // to rename files, for example

export const uploadMainImage = (req: Request, res: Response) => {
  // get the original name of the file
  const { originalname } = req.file as { originalname: string };
  // update the file name
  const { filename } = req.file as { filename: string };
  console.log("req.file Main", req.file);
  fs.rename(
    `src/images/projects/proj_container/${filename}`,
    `src/images/projects/proj_container/${originalname}`,
    (err: string) => {
      if (err) throw err;
      console.log("Rename complete!");
      res.send("File uploaded");
    }
  );
};

export const uploadProjectImages = (req: Request, res: Response) => {
  const projectName = req.query.projectName as string;
  function createStorageEngine(projectName: string) {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `src/images/projects/${projectName}/`);
      },
    });
  }
  const storage = createStorageEngine(projectName);
  const upload = multer({ storage: storage }).array("file", 9);
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error uploading file");
    }
    const requestedFiles = req.files as Express.Multer.File[];
    if (requestedFiles == undefined) return;
    // get the original name of the files
    const originalnames = requestedFiles.map((file) => file.originalname);
    // update the file names
    requestedFiles.forEach((file, index) => {
      const oldPath = `src/images/projects/${projectName}/${file.filename}`;
      const newPath = `src/images/projects/${projectName}/${file.originalname}`;
      fs.rename(oldPath, newPath, (err: string) => {
        if (err) throw err;
        console.log(`Renamed ${oldPath} to ${newPath}`);
      });
      const insertIntoDatabase = (req: Request, res: Response) => {
        const src = newPath;
        const project_id = database.query(
          `SELECT project_id FROM projects WHERE name = ${projectName}`
        );
        const image_id = index;
        database
          .query(
            "INSERT INTO images (src, project_id, image_id) VALUES (?, ?, ?)",
            [src, project_id, image_id]
          )
          .then((result: [OkPacket, FieldPacket[]]) => {
            const insertId: number = result[0].insertId;
            res.location(
              `/images-id/?project=${projectName}&image_id=${image_id}`
            );
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send(err);
          });
      };
      return insertIntoDatabase;
    });
    console.log("Uploaded Images", req.files);
    res.send("Files uploaded");
  });
};
