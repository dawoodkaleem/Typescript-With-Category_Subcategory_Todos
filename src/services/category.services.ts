import Category from "../model/category.model";

export const createCategoryService = async (name: string) => {
  const existingCategory = await Category.findOne({ name: name.trim() });
  if (existingCategory) {
    throw new Error("DUPLICATE_CATEGORY");
  }

  const newCategory = new Category({ name: name.trim() });
  return await newCategory.save();
};

export const getAllCategoriesService = async () => {
  return await Category.find();
};

export const getSingleCategoryService = async (id: string) => {
  return await Category.findById(id);
};

export const updateCategoryService = async (id: string, name: string) => {
  return await Category.findByIdAndUpdate(
    id,
    { name: name.trim() },
    { new: true }
  );
};

export const deleteCategoryService = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};
