import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verfiyUser.js";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("User test route!");
})

router.put("/update/:id", verifyUser, updateUser)



export default router