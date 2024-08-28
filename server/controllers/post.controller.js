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