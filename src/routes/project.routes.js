import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProject, getProjects } from "../controllers/project.controllers.js";

const router = Router();

router.route("/").post(verifyJWT, addProject).get(verifyJWT, getProjects);

export const projectRouter = router;
