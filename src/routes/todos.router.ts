import express, { Request, Response } from "express";
import TodosModel from "../model/todos.model";
import {
  createTodos,
  deleteTodos,
  getallTodos,
  getSingleTodos,
  updateTodos,
} from "../controllers/todos.controller";

const router = express.Router();

router.post("/", createTodos);

router.get("/", getallTodos);

router.get("/:id", getSingleTodos);
router.put("/:id", updateTodos);

router.delete("/:id", deleteTodos);

export default router;
