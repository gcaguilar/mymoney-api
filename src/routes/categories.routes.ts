import express from "express";
import { getCategoryById, validateGetCategory } from "../controller/categories/getCategoryById.controller";
import { editCategory, validateEditCategory } from "../controller/categories/editCategory.controller";
import { getCategories } from "../controller/categories/getCategories.controller";
import { createCategory, validateCreateCategory } from "../controller/categories/createCategory.controller";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", validateCreateCategory, createCategory);
router.get("/categories/:id", validateGetCategory, getCategoryById);
router.put("/categories/:id", validateEditCategory, editCategory);
router.delete("/categories/:id");

export default router;
