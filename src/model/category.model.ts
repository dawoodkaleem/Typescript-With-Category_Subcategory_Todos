import mongoose, { Document, Schema } from "mongoose";

// 1. Interface with Document
export interface ICategory extends Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Schema
const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true }, // ✅ fixed typo 'require' → 'required'
  },
  { timestamps: true }
);

// 3. Model export
export default mongoose.model<ICategory>("Category", categorySchema);
