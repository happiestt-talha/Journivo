import Post from "../models/post.model.js";
import { createError } from "../error/error.js";

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(createError(403, "You are not allowed to do that!"));
    }
    if (!req.body.title || !req.body.content) {
        return next(createError(400, "Please add a title and content"));
    }

    const slug = req.body.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");


    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        next(error);
    }

}
export const getallposts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}
export const getPosts = async (req, res, next) => {
    // ...(req.query.search && { title: new RegExp(req.query.search, "i") }),
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments()

        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const oneWeekAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 7
        );
        const lastMonthPosts = await Post.find({
            createdAt: { $gte: oneMonthAgo },
        });

        const lastWeekPosts = await Post.find({
            createdAt: { $gte: oneWeekAgo },
        });

        res.status(200).json({ posts, totalPosts, lastMonthPosts, lastWeekPosts });
    } catch (error) {
        next(error);
    }
}
export const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(createError(403, 'You are not allowed to delete this post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
}
export const updatePost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(createError(403, 'You are not allowed to delete this post'));
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    image: req.body.image,
                    category: req.body.category
                }
            },
            { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        next(createError(500, error));
    }
}