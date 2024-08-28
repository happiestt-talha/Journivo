import express from "express";
import { deleteUser, signout, updateUser, verifyAdmin } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verfiyUser.js";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("User test route!");
})

router.put("/update/:id", verifyUser, updateUser)
router.delete("/delete/:id", verifyUser, deleteUser)
router.post("/logout", signout)

router.get('/chkadmin', verifyUser, verifyAdmin)



export default router