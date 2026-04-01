import express from "express";
import { postSignup, postLogin, getLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", postSignup);

router.post("/login", postLogin);

router.get("/login/:userId", getLogin);

export default router;
