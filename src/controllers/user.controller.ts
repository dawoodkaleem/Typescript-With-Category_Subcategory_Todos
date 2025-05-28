import { Request, Response } from "express";
import {
  signupService,
  loginService,
  deleteUserService,
} from "../services/user.services";
import { IUser } from "../model/user.model";

// Signup Controller
export const userSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser = await signupService(email, password);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    if (error.message === "User already exists") {
      res.status(409).json({ message: error.message });
      return;
    }

    if (error.name === "ValidationError" && error.errors?.email) {
      res.status(400).json({
        message: "Email should be a valid format",
        field: "email",
      });
      return;
    }

    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};

// Login Controller
export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token: string = await loginService(email, password);
    res.status(200).json({ message: "Auth successful", token });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message });
  }
};

// Delete User Controller
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteUserService(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("User deletion error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
