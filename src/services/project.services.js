import { Project } from "../models/project.models.js";
import { User } from "../models/user.models.js";

const addProjectService = async (data) => {
  const isProjectAdminExists = await User.findOne({ _id: data.projectAdmins });
  if (!isProjectAdminExists) {
    return {
      message: "error",
      status: 404,
      error: "Project admin not foun...",
    };
  }

  const project = await Project.create(data);

  if (!project) {
    return { message: "error" };
  }

  return { message: "Project Added Successfully.", status: 201, data: project };
};

export { addProjectService };
