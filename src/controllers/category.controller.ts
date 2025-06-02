// controllers/category.controller.ts

import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.services";
import { ICategory } from "../model/category.model";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    res.status(400).json({
      message: "Invalid or missing 'name' field",
    });
  }

  try {
    const newCategory: ICategory | Error = await createCategoryService(name);
    res.status(201).json(newCategory);
  } catch (err: any) {
    if (err.message === "DUPLICATE_CATEGORY") {
      res
        .status(409)
        .json({ message: "Category with this name already exists" });
    } else {
      res.status(500).json({ message: "Error creating category", error: err });
    }
  }
};

export const getAllCategory = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err });
  }
};

export const getSingleCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await getSingleCategoryService(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category", error: err });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ message: "Invalid or missing 'name' field" });
    return;
  }

  try {
    const updatedCategory = await updateCategoryService(req.params.id, name);
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await deleteCategoryService(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err });
  }
};
