import express from "express";
import { createIncome, deleteIncome, getAllIncomes, getIncome, modifyIncome } from "../controllers/incomesCtrl.js";

const router = express.Router();

router.get("/", getAllIncomes);
router.post("/", createIncome);
router.get('/:incomeId', getIncome);
router.put("/:incomeId", modifyIncome);
router.delete("/:incomeId", deleteIncome);

export default router;