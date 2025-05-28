// services/todos.service.ts

import TodosModel, { ITodo } from "../model/todos.model";
import { Types } from "mongoose";

export const createTodosService = async (
  name: string,
  subcategoryId: string
): Promise<ITodo> => {
  const existing = await TodosModel.findOne({ name: name.trim() });
  if (existing) throw new Error("DUPLICATE_TODO");

  const todo = new TodosModel({ name: name.trim(), subcategoryId });
  await todo.save();
  return todo;
};
export const getAllTodosService = async (): Promise<ITodo[]> => {
  return await TodosModel.find();
};

export const getSingleTodoService = async (
  id: string
): Promise<ITodo | null> => {
  return await TodosModel.findById(id);
};

export const updateTodoService = async (
  id: string,
  name: string
): Promise<ITodo | null> => {
  return await TodosModel.findByIdAndUpdate(
    id,
    { name: name.trim() },
    { new: true }
  );
};

export const deleteTodoService = async (id: string): Promise<ITodo | null> => {
  return await TodosModel.findByIdAndDelete(id);
};
