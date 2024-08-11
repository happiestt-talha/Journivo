import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("User test route!");
})

export default router