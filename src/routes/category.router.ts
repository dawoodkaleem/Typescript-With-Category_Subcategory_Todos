import express from "express";
import { userAuth } from "../middleware/auth.user";
import {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

const router = express.Router();

// Create a category
router.post("/", userAuth, createCategory);

// Get all categories
router.get("/", userAuth, getAllCategory);

// Get category by ID
router.get("/:id", userAuth, getSingleCategory);

// Update category
router.put("/:id", userAuth, updateCategory);

// Delete category
router.delete("/:id", deleteCategory);

export default router;
