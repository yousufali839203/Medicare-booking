import express from "express";
import { login, register } from "../Controllers/authController.js";

const router = express.Router();

router.post("/login", login); // Use POST for login
router.post("/register", register); // Use POST for register

export default router;
