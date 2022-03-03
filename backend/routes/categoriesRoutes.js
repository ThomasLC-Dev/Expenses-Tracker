import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, modifyCategory } from "../controllers/categoriesCtrl.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get('/:categoryId', getCategory);
router.put('/:categoryId', modifyCategory);
router.delete('/:categoryId', deleteCategory);

export default router;