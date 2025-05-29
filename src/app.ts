import express from "express";
import { connectDB } from "./config/db.js"; // Again, relative path + .js
import categoryRouter from "./routes/category.router";
import dotenv from "dotenv";
import subcategoryRouter from "./routes/subcategory.router";
import morgan from "morgan";
import TodosRouter from "./routes/todos.router";
import userRoute from "./routes/user.router.js";
import hubspotRoute from "./routes/hubspot.router.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use("/api/categories", categoryRouter);
app.use("/api/subcategory", subcategoryRouter);
app.use("/api/todos", TodosRouter);
app.use("/api/user", userRoute);
app.use("/", hubspotRoute);

connectDB();

export default app;
