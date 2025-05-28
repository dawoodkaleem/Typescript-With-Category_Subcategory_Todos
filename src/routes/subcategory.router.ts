import express from "express";
import {
  createSubcategory,
  getAllSubcategory,
  getSingleSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller";

const router = express.Router();

router.post("/", createSubcategory);

router.get("/", getAllSubcategory);
router.get("/:id", getSingleSubcategory);

router.put("/:id", updateSubcategory);
router.delete("/:id", deleteSubcategory);

export default router;
