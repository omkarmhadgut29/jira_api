import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    scrumRole: {
      type: String,
      emum: [
        "admin",
        "projectOwner",
        "scrumMaster",
        "scrumTeam",
        "tester",
        "user",
      ],
      default: "user",
    },
    department: {
      type: String,
      emum: ["admin", "manager", "development", "testing"],
    },
    createdByUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  const tokenData = {
    _id: this._id,
    username: this.username,
    email: this.email,
    scrumRole: this.scrumRole,
    department: this.department,
  };

  return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRETE_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
  });
};

userSchema.methods.generateRefreshToken = async function () {
  const tokenData = {
    _id: this._id,
    username: this.username,
    email: this.email,
    scrumRole: this.scrumRole,
    department: this.department,
  };

  return jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRETE_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME,
  });
};

export const User = mongoose.model("User", userSchema);
