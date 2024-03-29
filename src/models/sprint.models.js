import mongoose, { Schema } from "mongoose";

const sprintSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    createdByOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assigneeMasters: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Sprint = mongoose.model("Sprint", sprintSchema);
