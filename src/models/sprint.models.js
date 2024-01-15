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
    createdByOwner: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    assigneeMasters: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

export const Sprint = mongoose.model("Sprint", sprintSchema);
