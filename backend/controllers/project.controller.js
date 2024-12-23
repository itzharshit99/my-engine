import projectModel from "../models/project.model.js";
import * as projectService  from "../service/project.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;
    const newProject = await projectService.createProject({ name, userId });
    res.status(201).json(newProject);
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message);
  }
};
