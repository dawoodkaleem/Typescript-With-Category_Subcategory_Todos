import mongoose, { Document, Schema, Model,Types } from "mongoose";

// 1. Define the TypeScript interface for the User document
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password?: string | null;
  googleId?: string | null;
  hubspotId?: string | null;
  hubspotAccessToken?: string | null;
  hubspotTokenExpiresAt?: Date | null;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the Mongoose schema
const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    hubspotId: {
      type: String,
      default: null,
    },
    hubspotAccessToken: {
      type: String,
      default: null,
    },
    hubspotTokenExpiresAt: {
      type: Date,
      default: null,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// 3. Export the model
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
