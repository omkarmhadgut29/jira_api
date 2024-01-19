import { Project } from "../models/project.models.js";
import { User } from "../models/user.models.js";

const addProjectService = async (data) => {
  const isProjectAdminExists = await User.findOne({ _id: data.projectAdmins });
  if (!isProjectAdminExists) {
    return {
      message: "error",
      status: 404,
      error: "Project admin not found...",
    };
  }

  const project = await Project.create(data);

  if (!project) {
    return { message: "error" };
  }

  return { message: "Project Added Successfully.", status: 201, data: project };
};

const getProjectsService = async () => {
  const projects = await Project.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "projectAdmins",
        foreignField: "_id",
        as: "admins",
        pipeline: [
          {
            $project: {
              username: 1,
              email: 1,
              scrumRole: 1,
              department: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        admins: 1,
      },
    },
  ]);

  if (!projects) {
    return {
      message: "error",
      status: 404,
      error: "Projects not found...",
    };
  }

  return {
    message: "Success.",
    status: 201,
    data: projects,
  };
};

export { addProjectService, getProjectsService };
