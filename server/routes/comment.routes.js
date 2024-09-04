import express from 'express'
const router = express.Router()
import { createComment, deleteComment, getAllComments, getComments, likeComment } from '../controllers/comment.controller.js';
import { verifyUser } from '../middlewares/verfiyUser.js';

router.get("/test", (req, res) => {
    res.send("Comment test route!");
})

router.post('/create', verifyUser, createComment)
router.get('/getcomments/:postId', getComments)
router.delete('/del-comment/:commentId/:userId', verifyUser, deleteComment)
router.put('/like/:commentId', verifyUser, likeComment)
router.get('/getallcomments', verifyUser, getAllComments)
export default router