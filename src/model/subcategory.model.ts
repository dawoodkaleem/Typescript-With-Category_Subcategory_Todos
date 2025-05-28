import mongoose, { Document, Schema } from "mongoose";

// 1. Define the TypeScript interface
export interface ISubCategory extends Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Create the schema using the interface
const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

// 3. Export the model
const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
export default SubCategory;
