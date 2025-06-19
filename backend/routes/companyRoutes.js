import express from "express";
import {
  createCompany,
  updateCompany,
  getCompanyByUser,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCompany);
router.put("/:id", protect, updateCompany);
router.get("/me", protect, getCompanyByUser); // Get logged-in user's company

export default router;
