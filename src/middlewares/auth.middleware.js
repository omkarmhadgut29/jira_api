import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { logoutUser } from "../controllers/user.controllers.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");
  try {
    if (!accessToken) {
      res.status(401).json({ messeage: "Unauthorized request..." });
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRETE_KEY
    );

    const user = await User.findOne({ _id: decodedToken._id })?.select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(401).json({ messeage: "Invalid Access Token" });
    }

    req.user = user;

    next();
  } catch (error) {
    // console.log("error");
    if (error.message === "jwt expired") {
      const decodedToken = jwt.decode(
        accessToken,
        process.env.ACCESS_TOKEN_SECRETE_KEY
      );

      const user = await User.findById(decodedToken._id);

      user.refreshToken = "";

      await user.save();
    }
    return res.status(500).json({
      messeage: "Something went wrong...",
      error: error,
    });
  }
});

export { verifyJWT };
