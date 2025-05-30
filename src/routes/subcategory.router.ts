import express from "express";
import { userAuth } from "../middleware/auth.user";
import {
  createSubcategory,
  getAllSubcategory,
  getSingleSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller";

const router = express.Router();

router.post("/", userAuth, createSubcategory);

router.get("/", userAuth, getAllSubcategory);
router.get("/:id", getSingleSubcategory);

router.put("/:id", userAuth, updateSubcategory);
router.delete("/:id", userAuth, deleteSubcategory);

export default router;
