// controllers/todos.controller.ts

import { Request, Response } from "express";
import {
  createTodosService,
  getAllTodosService,
  getSingleTodoService,
  updateTodoService,
  deleteTodoService,
} from "../services/todos.services";

export const createTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, subcategoryId } = req.body;

  if (!name || name.trim() === "") {
    res.status(400).json({ message: "Invalid or missing 'name' field" });
    return;
  }

  try {
    const newTodo = await createTodosService(name, subcategoryId);
    res.status(201).json(newTodo);
  } catch (error: any) {
    if (error.message === "DUPLICATE_TODO") {
      res.status(409).json({ message: "Todo already exists" });
    } else {
      res.status(500).json({ message: "Error creating todo", error });
    }
  }
};

export const getallTodos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await getAllTodosService();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

export const getSingleTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await getSingleTodoService(req.params.id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
};

export const updateTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    res.status(400).json({ message: "Invalid or missing 'name' field" });
    return;
  }

  try {
    const updated = await updateTodoService(req.params.id, name);
    if (!updated) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json({ message: "Todo updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const deleteTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await deleteTodoService(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
