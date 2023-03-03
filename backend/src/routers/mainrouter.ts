import { Router } from "express";
import multer from "multer";
const fs = require("fs"); // to rename files, for example

import {
  deleteProjectById,
  getAllProjects,
  getProjectById,
  getProjectByName,
  postProject,
} from "../handlers/project_handlers";
import { getImages, getImagesById } from "../handlers/image_handlers";
import { validateSubmit } from "../validators/contact_validators";
import { submitContactForm } from "../handlers/contact_handler";
import {
  createUser,
  deleteUserById,
  getUserById,
  loginUser,
} from "../handlers/user_handler";
import { errorHandler, verifyToken } from "../auth/token_auth";
import { dashboard } from "../handlers/secure.dashboard";
import {
  uploadMainImage,
  uploadProjectImages,
} from "../handlers/multer_handlers";

const MainRouter = Router();

MainRouter.get("/api/projects", getAllProjects);
MainRouter.get("/api/project", getProjectByName);
MainRouter.get("/api/project-nr/", getProjectById);
MainRouter.get("/images", getImages);
MainRouter.get("/images-id", getImagesById);
MainRouter.post("/contact", validateSubmit, submitContactForm);
MainRouter.post("/api/login", loginUser);

MainRouter.use(verifyToken, errorHandler);

MainRouter.get("/dashboard", dashboard);
MainRouter.post("/api/user", createUser);
MainRouter.get("/api/user-nr/", getUserById);
MainRouter.delete("/api/user-nr/", deleteUserById);

MainRouter.post("/api/projects/", postProject);
MainRouter.put("/api/project-nr/");
MainRouter.delete("/api/project-nr/", deleteProjectById);

const uploadMain = multer({ dest: "src/images/projects/proj_container/" });
MainRouter.post(
  "/api/projects/uploadMain",
  uploadMain.single("uploaded_file"), // rename the "field name" on the PostMan to avatar or whatever we want or the upload fails
  uploadMainImage
);

MainRouter.post("/api/projects/uploadImages", uploadProjectImages);

export default MainRouter;
