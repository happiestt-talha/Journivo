import express from 'express';
const router = express.Router();
import { signUp } from '../controllers/auth.controller.js';

router.get("/test", (req, res) => {
    res.send("Auth test route!");
})

router.post("/signup", signUp)

export default router