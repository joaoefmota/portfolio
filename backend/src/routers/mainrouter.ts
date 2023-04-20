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
import {
  deletePlayground,
  getAllPlayground,
  postPlayground,
} from "../handlers/playground_handlers";
import { validateLogin } from "../validators/login_validators";
import { validateProjectSubmit } from "../validators/project_validators";
import { validatePlayground } from "../validators/playground_validators";
import { validateToken } from "../handlers/validateToken";

const MainRouter = Router();

MainRouter.get("/api/projects", getAllProjects);
MainRouter.get("/api/project", getProjectByName);
MainRouter.get("/api/project-nr/", getProjectById);
MainRouter.get("/images", getImages);
MainRouter.get("/images-id", getImagesById);
MainRouter.get("/api/playground", getAllPlayground);
MainRouter.post("/contact", validateSubmit, submitContactForm);
MainRouter.post("/api/login", validateLogin, loginUser);

MainRouter.use(verifyToken, errorHandler);

MainRouter.get("/validateToken", validateToken);
MainRouter.get("/dashboard", dashboard);
MainRouter.post("/api/user", createUser);
MainRouter.get("/api/user-nr/", getUserById);
MainRouter.delete("/api/user-nr/", deleteUserById);

MainRouter.post("/api/projects/", validateProjectSubmit, postProject);
MainRouter.put("/api/project-nr/");
MainRouter.delete("/api/project-nr/", deleteProjectById);

MainRouter.post("/api/playground", validatePlayground, postPlayground);
MainRouter.delete("/api/playground-nr/", deletePlayground);

MainRouter.post(
  "/api/projects/uploadMain",
  // rename the "field name" on the PostMan to avatar or whatever we want or the upload fails
  uploadMainImage
);

MainRouter.post("/api/projects/uploadImages", uploadProjectImages);

export default MainRouter;
