import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createJob); // Employer creates job
router.get("/", getJobs); // Anyone can view all jobs
router.get("/:id", getJobById); // View job by ID
router.put("/:id", protect, updateJob); // Employer updates job
router.delete("/:id", protect, deleteJob); // Employer deletes job

export default router;
