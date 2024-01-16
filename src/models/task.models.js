import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdByUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    story: {
      type: Schema.Types.ObjectId,
      ref: "Story",
    },
    assignees: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
