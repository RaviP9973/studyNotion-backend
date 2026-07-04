import express from "express";
const router = express.Router();
import { login, signUp, sendOTP, changePassword, logout } from "../controllers/Auth.js";
import { resetPasswordToken, resetPassword } from "../controllers/ResetPass.js";

import { auth } from "../middleware/auth.js";

router.post("/login",login)
router.post("/signup",signUp)
router.post("/sendotp",sendOTP);
router.put("/changepassword",auth,changePassword)
router.post("/logout", logout)

//Reset Password

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-password",resetPassword)
export default router;