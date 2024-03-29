import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routers
import { userRouter } from "./routes/user.routes.js";
import { projectRouter } from "./routes/project.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);

export { app };
