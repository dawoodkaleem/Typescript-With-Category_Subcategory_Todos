import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  userId: string;
  email: string;
}

// Extend Express Request interface to include userData (if not already done globally)
declare module "express-serve-static-core" {
  interface Request {
    userData?: TokenPayload;
  }
}

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }

    const token: string = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    const decoded: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    );

    if (typeof decoded === "string") {
      // If decoded is a string, reject because we expect an object payload
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    // Now decoded is JwtPayload (object), but we need to assert it matches TokenPayload
    const userData = decoded as TokenPayload;

    if (!userData.userId || !userData.email) {
      res.status(401).json({ message: "Invalid token payload data" });
      return;
    }

    req.userData = userData;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("JWT auth error:", error.message);
      res
        .status(401)
        .json({ message: "Authentication failed", error: error.message });
      return;
    }

    res
      .status(401)
      .json({ message: "Authentication failed", error: "Unknown error" });
    return;
  }
};
