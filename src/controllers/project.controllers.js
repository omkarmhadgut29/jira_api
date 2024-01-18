import { addProjectService } from "../services/project.services.js";

const addProject = async (req, res) => {
  const reqUser = req.user;
  if (
    !reqUser ||
    !["admin", "projectOwner"].some((field) => field === reqUser?.scrumRole)
  ) {
    return res.status(401).json({
      message: "Unauthorised request...",
    });
  }

  const { title, description, projectAdmins } = req.body;

  if (
    [title, description, projectAdmins].some(
      (field) => !field || field?.trim() === ""
    )
  ) {
    return res.status(401).json({
      message: "All fields are required...",
    });
  }

  const response = await addProjectService({
    reqUser,
    title,
    description,
    projectAdmins,
  });

  if (response.message === "error") {
    return res.status(response?.status || 500).json({
      error: response?.error || "Internal server error...",
    });
  }

  return res.status(response?.status || 201).json({
    message: response?.message || "Project Added",
    data: response?.data || response,
  });
};

export { addProject };
