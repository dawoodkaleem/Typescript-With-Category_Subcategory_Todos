import express from "express";
import {
  createCateory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/Category.controller";

const router = express.Router();

// Create a category
router.post("/", createCateory);

// Get all categories
router.get("/", getAllCategory);

// Get category by ID
router.get("/:id", getSingleCategory);

// Update category
router.put("/:id", updateCategory);

// Delete category
router.delete("/:id", deleteCategory);

export default router;
