import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      emum: ["admin", "project manager", "team lead", "developer", "tester"],
      required: true,
    },
    department: {
      type: String,
      emum: ["admin", "manager", "development", "testing"],
      required: true,
    },
    currentProject: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    previousProject: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
