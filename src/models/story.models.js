import mongoose, { Schema } from "mongoose";

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sprint: {
      type: Schema.Types.ObjectId,
      ref: "Sprint",
    },
    createdByUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

export const Story = mongoose.model("Story", storySchema);
