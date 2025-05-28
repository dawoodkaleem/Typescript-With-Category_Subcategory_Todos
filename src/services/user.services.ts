import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../model/user.model";
import { IUser } from "../model/user.model";
import { Document } from "mongoose";

// Define return type for JWT
interface TokenPayload {
  email: string;
  userId: string;
}
type IUserDoc = IUser & Document;

export const signupService = async (
  email: string,
  password: string
): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return newUser;
};

interface TokenPayload {
  email: string;
  userId: string;
}

export const loginService = async (
  email: string,
  password: string
): Promise<string> => {
  const user = (await User.findOne({ email })) as IUserDoc;

  if (!user) {
    throw new Error("Invalid credentials - user not found");
  }

  if (!user.password) {
    throw new Error("Invalid credentials - password not set");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials - password incorrect");
  }

  const token: string = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    } as TokenPayload,
    process.env.JWT_KEY as string,
    { expiresIn: "1h" }
  );

  return token;
};

export const deleteUserService = async (userId: string): Promise<boolean> => {
  const result = await User.deleteOne({ _id: userId });
  if (result.deletedCount === 0) {
    throw new Error("User not found");
  }
  return true;
};
