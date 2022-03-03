import express from "express";
import { deleteUser, getAllUsers, getUser, modifyUser } from "../controllers/usersCtrl.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get('/:userId', getUser);
router.put("/:userId", modifyUser);
router.delete("/:userId", deleteUser);

export default router;