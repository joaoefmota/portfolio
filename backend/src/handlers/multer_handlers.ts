import { Request, Response } from "express";
import multer from "multer";
import database from "../database";
import { RowDataPacket } from "mysql2";
const fs = require("fs"); // to rename files, for example

export const uploadMainImage = async (req: Request, res: Response) => {
  const uploadMain = multer({ dest: "src/images/projects/proj_container/" });
  uploadMain.single("uploaded_file")(req, res, async (err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const projectName = req.query.projectName as string;
    console.log("projectName", projectName);
    console.log("req.file Main", req.file);

    try {
      const requestedFile = req.file as Express.Multer.File;
      if (requestedFile === undefined) return;

      const oldPath = `src/images/projects/proj_container/${requestedFile.filename}`;
      const newPath = `src/images/projects/proj_container/${requestedFile.originalname}`;

      const rename = await fs.promises.rename(oldPath, newPath);
      console.log("Rename complete!", rename);

      const [id] = (await database.query(
        "SELECT project_id FROM projects WHERE name = ?",
        [projectName]
      )) as RowDataPacket[];

      const src = `/images/projects/proj_container/${requestedFile.originalname}`;
      const project_id = id[0].project_id;

      await database.query(
        "INSERT INTO images (src, project_id, image_id) VALUES (?, ?, ?)",
        [src, project_id, 0]
      );

      res.send("File uploaded");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
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

  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error uploading file");
    }

    const requestedFiles = req.files as Express.Multer.File[];
    if (requestedFiles == undefined) return;

    // update the file names and insert into the database
    for (let index = 0; index < requestedFiles.length; index++) {
      const file = requestedFiles[index];
      const oldPath = `src/images/projects/${projectName}/${file.filename}`;
      const newPath = `src/images/projects/${projectName}/${file.originalname}`;

      try {
        await fs.promises.rename(oldPath, newPath);
        console.log(`Renamed ${oldPath} to ${newPath}`);

        const [id] = (await database.query(
          "SELECT project_id FROM projects WHERE name = ?",
          [projectName]
        )) as RowDataPacket[];

        const src = `/images/projects/${projectName}/${file.originalname}`;
        const project_id = id[0].project_id;
        const image_id = index;

        await database.query(
          "INSERT INTO images (src, project_id, image_id) VALUES (?, ?, ?)",
          [src, project_id, image_id]
        );

        res.location(`/images-id/?project=${projectName}&image_id=${image_id}`);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    }

    console.log("Uploaded Images", req.files);
    res.send("Files uploaded");
  });
};
