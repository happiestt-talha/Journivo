import express from 'express'
const router = express.Router()
import { createPost, getPosts } from '../controllers/post.controller.js';
import { verifyUser } from '../middlewares/verfiyUser.js';

router.get("/test", (req, res) => {
    res.send("Post test route!");
})

router.post("/create", verifyUser, createPost)
router.get('"getPost',getPosts)

export default router