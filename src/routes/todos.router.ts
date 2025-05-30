import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.user";
import {
  createTodos,
  deleteTodos,
  getallTodos,
  getSingleTodos,
  updateTodos,
} from "../controllers/todos.controller";

const router = express.Router();

router.post("/", userAuth, createTodos);

router.get("/", userAuth, getallTodos);

router.get("/:id", userAuth, getSingleTodos);
router.put("/:id", userAuth, updateTodos);

router.delete("/:id", userAuth, deleteTodos);

export default router;
