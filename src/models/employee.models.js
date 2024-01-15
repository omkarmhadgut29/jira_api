import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    scrumRole: {
      type: String,
      emum: ["admin", "project owner", "scrum master", "scrum team", "tester"],
      required: true,
    },
    department: {
      type: String,
      emum: ["admin", "manager", "development", "testing"],
      required: true,
    },
    // currentProject: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Project",
    // },
    // previousProject: {
    //   type: [Schema.Types.ObjectId],
    //   ref: "Project",
    // },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
