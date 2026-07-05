import express from "express";
const router = express.Router();
import { login, signUp, sendOTP, changePassword, logout } from "../controllers/Auth.js";
import { resetPasswordToken, resetPassword } from "../controllers/ResetPass.js";

import { auth } from "../middleware/auth.js";

import { authRateLimit } from "../middleware/rateLimit.js";

router.post("/login", authRateLimit, login)
router.post("/signup", authRateLimit, signUp)
router.post("/sendotp", authRateLimit, sendOTP);
router.put("/changepassword",auth,changePassword)
router.post("/logout", logout)

//Reset Password

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-password",resetPassword)
export default router;