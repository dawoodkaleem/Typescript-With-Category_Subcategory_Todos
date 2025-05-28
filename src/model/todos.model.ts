import mongoose, { Document, Schema } from "mongoose";

// 1. Define the TypeScript interface
export interface ITodo extends Document {
  name: string;
  subcategoryId: mongoose.Types.ObjectId; // References SubCategory
  createdAt?: Date;
  updatedAt?: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    name: { type: String, required: true },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
  },
  { timestamps: true }
);

// 3. Export the model
const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
