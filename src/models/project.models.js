import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    createdByUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    projectAdmins: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
