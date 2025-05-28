// controllers/subcategory.controller.ts

import { Request, Response } from "express";
import {
  createSubcategoryService,
  getAllSubcategoriesService,
  getSingleSubcategoryService,
  updateSubcategoryService,
  deleteSubcategoryService,
} from "../services/subcategory.services";

export const createSubcategory = async (req: Request, res: Response) => {
  const { name, categoryId } = req.body;

  if (!name || name.trim() === "") {
    res.status(400).json({ message: "Invalid or missing 'name' field" });
    return;
  }

  try {
    const newSubcategory = await createSubcategoryService(name, categoryId);
    res.status(201).json(newSubcategory);
  } catch (error: any) {
    if (error.message === "DUPLICATE_SUBCATEGORY") {
      res
        .status(409)
        .json({ message: "Subcategory with this name already exists" });
    } else {
      res.status(500).json({ message: "Error creating subcategory", error });
    }
  }
};

export const getAllSubcategory = async (_req: Request, res: Response) => {
  try {
    const subcategories = await getAllSubcategoriesService();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

export const getSingleSubcategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subcategory = await getSingleSubcategoryService(req.params.id);
    if (!subcategory) {
      res.status(404).json({ message: "Subcategory not found" });
      return;
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategory", error });
  }
};

export const updateSubcategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    res.status(400).json({ message: "Invalid or missing 'name'" });
    return;
  }

  try {
    const updated = await updateSubcategoryService(req.params.id, name);
    if (!updated) {
      res.status(404).json({ message: "Subcategory not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory", error });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteSubcategoryService(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Subcategory not found" });
      return;
    }
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};
