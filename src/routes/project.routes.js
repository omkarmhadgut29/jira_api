import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProject } from "../controllers/project.controllers.js";

const router = Router();

router.route("/").post(verifyJWT, addProject);

export const projectRouter = router;
