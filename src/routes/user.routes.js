import { Router } from "express";
import {
  getAdmins,
  getAllUsers,
  getUsersAddedByAdmin,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateScrumRoleOrDepartment,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/register").post(verifyJWT, registerUser);

router.route("refreshAccessToken").post(refreshAccessToken);

router.route("/").get(verifyJWT, getAllUsers);

router.route("/admin").get(getAdmins);

router
  .route("/admin/users")
  .post(verifyJWT, getUsersAddedByAdmin)
  .patch(updateScrumRoleOrDepartment);

export const userRouter = router;
