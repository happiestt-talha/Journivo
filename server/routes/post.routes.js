import express from 'express'
const router = express.Router()
import { createPost, getallposts, getPosts } from '../controllers/post.controller.js';
import { verifyUser } from '../middlewares/verfiyUser.js';

router.get("/test", (req, res) => {
    res.send("Post test route!");
})

router.post("/create", verifyUser, createPost)
router.get('/getallposts', getallposts)
router.get('/getpost', getPosts)

export default router