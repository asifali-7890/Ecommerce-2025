import express from "express";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();

// POST /api/v1/contact - Create a new contact message
router.post("/", createContact);

export default router;
