// types/express/index.d.ts or express.d.ts
import { IUser } from "../models/user.model"; // adjust path as needed
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser; // if added in middleware
    userData?: {
      userId: string;
      email: string;
    }; // adjust as per your JWT payload
  }
}
