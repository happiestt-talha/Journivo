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
        const comment = await Comment.findById(req.params.commentId);
        let liked = comment.likes.includes(req.user.id);
        if (!comment) {
            return next(createError(404, 'Comment not found'));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        console.log('User index: ', userIndex)
        if (userIndex === -1) {
            comment.likes.push(req.user.id);
            liked = true;
            comment.totalLikes += 1;
        } else {
            comment.likes.splice(userIndex, 1);
            liked = false;
            comment.totalLikes -= 1;
        }
        console.log('Final total likes: ', totalLikes)
        console.log('Final liked: ', liked)
        await comment.save();
        
        res.status(200).json({ liked, totalLikes });
    } catch (error) {
        next(error);
    }
}

export const getAllComments = async (req, res, next) => {
    if (!req.user.isAdmin)
        return next(errorHandler(403, 'You are not allowed to get all comments'));
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? 1 : -1;
        const comments = await Comment.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        const totalComments = await Comment.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthComments = await Comment.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
        next(error);
    }
}