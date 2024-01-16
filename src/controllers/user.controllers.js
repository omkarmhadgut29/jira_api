import { adminUsers } from "../constants.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    console.log(userId);
    const user = await User.findOne({ _id: userId });

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error("Something went wrong...");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // * check email and password are empty or not
  if (!email || email?.trim() === "" || !password || password?.trim() === "") {
    return res
      .status(401)
      .json({ message: "All data fields are mandatory..." });
  }

  // * find user matches with email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found...." });
  }

  // * get password of user and pass it to isPasswordCorrect method to check password
  const isValidUser = await user.isPasswordCorrect(password);
  if (!isValidUser) {
    return res.status(404).json({ message: "Password dose not matched...." });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json({
    message: "User Loged In Successfully...",
    user: loggedInUser,
    accessToken,
    refreshToken,
  });
};

const registerUser = async (req, res) => {
  //   const user = req.user;

  //   if (!user || !(adminUsers in user?.scrumRole))
  //     return res.status(401).json({ message: "Unothorised access" });

  const { username, email, password, fullname, scrumRole, department } =
    req.body;

  if (
    [username, email, password].some((field) => !field || field.trim() === "")
  ) {
    return res.status(400).json({ message: "All Fields are required." });
  }

  // * Check is user exist or not
  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  // * if user exists then send error
  if (isUserExist)
    return res.status(401).json({ message: "User already exists...." });

  const userData = {
    username,
    email,
    password,
    fullname,
  };

  // * If user is adminUser then add scrumRole in userData
  const reqUser = req.user;

  if (reqUser?.scrumRole) {
    if (reqUser?.scrumRole in adminUsers) {
      if (
        [scrumRole, department].some((field) => !field || field.trim() === "")
      ) {
        return res
          .status(400)
          .json({ message: "Scrum role and department is required..." });
      }

      userData.scrumRole = scrumRole;
      userData.department = department;
      userData.createdByUser = reqUser._id;
    }
  }

  //   console.log(userData);

  // * if user not exist then create new user
  const user = await User.create({
    ...userData,
  });

  return res.status(200).json({ message: "User created successfully.", user });
  //   return res
  //     .status(200)
  //     .json({ message: "User created successfully.", userData });
};

const getAddedUsers = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser) {
    return res.status(401).json({ message: "Unaothorised request..." });
  }

  if (!(reqUser.scrumRole in adminUsers)) {
    return res.status(401).json({ message: "Unaothorised request..." });
  }

  const users = await User.find({ createdByUser: reqUser._id });

  return res.status(200).json({
    message: "success",
    users,
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users || users?.length < 1) {
    return res.status(404).json({
      message: "Users Not Found",
    });
  }

  return res.status(200).json({
    message: "Success",
    users,
  });
};

export { loginUser, registerUser, getAddedUsers, getAllUsers };
