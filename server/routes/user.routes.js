import express from "express";
import { deleteUser, signout, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verfiyUser.js";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("User test route!");
})

router.put("/update/:id", verifyUser, updateUser)
router.delete("/delete/:id", verifyUser, deleteUser)
router.post("/logout", signout)



export default router