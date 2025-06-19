import express from "express";
import {
  applyToJob,
  getApplicationsBySeeker,
  deleteApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, applyToJob); // Apply to a job
router.get("/my-applications", protect, getApplicationsBySeeker); // View own applications
router.delete("/:id", protect, deleteApplication); // Withdraw/delete application

export default router;
