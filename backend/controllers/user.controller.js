import userModel from "../models/user.model.js";
import * as userServices from "../service/user.service.js";
import { validationResult } from "express-validator";

export const createUserController = async (req, res) => {
  //req comming from body and checking for error from express validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userServices.createUser(req.body);
    const token = await user.generateJWT();
    res.status(201).json({user,token});
  } catch (error) {
    res.status(400).send(error.message);
  }
};
