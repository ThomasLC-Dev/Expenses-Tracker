import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, modifyProject } from "../controllers/projectsCtrl.js";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", createProject);
router.get('/:projectId', getProject);
router.put("/:projectId", modifyProject);
router.delete("/:projectId", deleteProject);

export default router;