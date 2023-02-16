import { Router } from "express";
import { deflate } from "zlib";

import {
  getAllProjects,
  getProjectById,
  getProjectByName,
} from "../handlers/project_handlers";
import { getImages } from "../handlers/image_handlers";
import { validateSubmit } from "../validators/contact_validators";
import { submitContactForm } from "../handlers/contact_handler";
import { createUser, loginUser } from "../handlers/user_handler";
import { verifyToken } from "../auth/token_auth";

const MainRouter = Router();

MainRouter.get("/projects", getAllProjects);
MainRouter.get("/project", getProjectByName);
MainRouter.get("/project-nr/", getProjectById);
MainRouter.get("/images", getImages);
MainRouter.post("/contact", validateSubmit, submitContactForm);
MainRouter.post("/api/create", createUser);
MainRouter.post("/api/login", loginUser);

// MainRouter.use(verifyToken);
MainRouter.get("/secure");

export default MainRouter;
