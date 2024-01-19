import { Sprint } from "../models/sprint.models.js";

const addSprint_service = async (data) => {
  const isSprint = Sprint.findOne({ title: data.title });

  if (isSprint) {
    return {
      message: "error",
      status: 403,
      error: "Sprint already exists...",
    };
  }

  const sprint = await Sprint.create(data);
};

export { addSprint_service };
