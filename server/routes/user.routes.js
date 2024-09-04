import express from "express";
import { deleteUser, getAllUsers, getUser, signout, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verfiyUser.js";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("User test route!");
})

router.put("/update/:id", verifyUser, updateUser)
router.delete("/delete/:id", verifyUser, deleteUser)
router.post("/logout", signout)
router.get("/getuser/:userId", getUser)
router.get("/getallusers", verifyUser, getAllUsers)

export default router