import userModel from "../models/user.model.js";
import * as userServices from "../service/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../service/redis.service.js";

export const createUserController = async (req, res) => {
  //req comming from body and checking for error from express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userServices.createUser(req.body);
    const token = await user.generateJWT();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        errors: "invalid credentials",
      });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        errors: "invalid credentials",
      });
    }

    const token = await user.generateJWT();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const profileController = async(req,res)=>{
  console.log(req.user);
  res.status(200).json({
    user:req.user
  })
}
