import express from "express";
import { createExpense, deleteExpense, getAllExpenses, getExpense, modifyExpense } from "../controllers/expensesCtrl.js";

const router = express.Router();

router.get("/", getAllExpenses);
router.post("/", createExpense);
router.get('/:expenseId', getExpense);
router.put("/:expenseId", modifyExpense);
router.delete("/:expenseId", deleteExpense);

export default router;