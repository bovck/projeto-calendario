import express from "express";
import { postSignup, loginSignup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", postSignup);

router.post("/login", loginSignup);

export default router;
