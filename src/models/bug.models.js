import mongoose, { Schema } from "mongoose";

const bugSchema = new Schema(
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
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true }
);

export const Bug = mongoose.model("Bug", bugSchema);
