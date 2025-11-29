// src/routes/auth.js
import express from "express";
import { signupValidator } from "../validators/authValidators.js";
import { signup, refreshAccessToken, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.get("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
