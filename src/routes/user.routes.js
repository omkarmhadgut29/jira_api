import { Router } from "express";
import {
  getAddedUsers,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/register").post(verifyJWT, registerUser);

router.route("/getusers").post(verifyJWT, getAddedUsers);

router.route("/getallusers").get(verifyJWT, getAllUsers);

router.route("/").get(verifyJWT, getAllUsers).post(verifyJWT, getAddedUsers);

export const userRouter = router;
