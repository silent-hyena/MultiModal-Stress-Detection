import express from "express";
import { register } from "../controllers/authControllers.js";
import { login } from "../controllers/authControllers.js";  
import { verifyToken } from "../middleware/verifyToken.js";
// import { sendOtp, verifyOtp, resetPassword } from "../controller/authControllers.js";
// import { sendOtpRegister, VerifyRegister } from "../controller/authControllers.js";
const router=express.Router();

router.post("/register", register);
router.post("/login" , login);

export default router;