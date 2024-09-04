import { createError } from "../error/error.js";
import Comment from "../models/comment.model.js"
export const createComment = async (req, res, next) => {
    try {
        const { comment, postId, userId } = req.body;

        if (userId !== req.user.id) {
            return next(createError(403, 'You are not allowed to create this comment'));
        }

        const newComment = new Comment({
            comment,
            postId,
            userId
        })

        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (req.user.isAdmin || comment.userId === req.user.id) {
            await comment.deleteOne()
            res.status(200).json('the comment has been deleted')
        } else {
            return next(createError(403, 'You can delete only your comment'))
        }
    } catch (error) {
        next(error)
    }
}

export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment.likes.includes(req.user.id)) {
            await comment.updateOne({ $push: { likes: req.user.id } })
            res.status(200).json({
                message: 'The comment has been liked',
                liked: true
            })
        } else {
            await comment.updateOne({ $pull: { likes: req.user.id } })
            res.status(200).json({
                message: 'The comment has been disliked',
                liked: false
            })
        }
    } catch (error) {
        next(error)
    }
}

export const getAllComments = async (req, res, next) => {
    try {
        // if (!req.user.isAdmin) {
        //     return next(createError(403, 'You are not allowed to see all comments'))            
        // }
        const comments = await Comment.find()
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}