import userModel from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password not found");
  }
  //hashing password
  const hashedPassword = await userModel.hashPassword(password);
  //creating user
  const user = await userModel.create({
    email,
    password: hashedPassword,
  });
  return user;
};
