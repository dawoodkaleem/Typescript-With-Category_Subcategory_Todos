// services/subcategory.service.ts

import SubcategoryModel from "../model/subcategory.model";

export const createSubcategoryService = async (
  name: string,
  categoryId: string
) => {
  const existing = await SubcategoryModel.findOne({ name: name.trim() });
  if (existing) throw new Error("DUPLICATE_SUBCATEGORY");

  const newSubcategory = new SubcategoryModel({
    name: name.trim(),
    categoryId,
  });
  return await newSubcategory.save();
};

export const getAllSubcategoriesService = async () => {
  return await SubcategoryModel.find();
};

export const getSingleSubcategoryService = async (id: string) => {
  return await SubcategoryModel.findById(id);
};

export const updateSubcategoryService = async (id: string, name: string) => {
  return await SubcategoryModel.findByIdAndUpdate(
    id,
    { name: name.trim() },
    { new: true }
  );
};

export const deleteSubcategoryService = async (id: string) => {
  return await SubcategoryModel.findByIdAndDelete(id);
};
