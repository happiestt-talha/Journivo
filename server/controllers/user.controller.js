import { createError } from "../error/error.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'

export const updateUser = async (req, res, next) => {

    // console.log('req.user: ', req.user)

    if (req.user.id !== req.params.id) {
        return next(createError(403, "You can update only your account!"))
    }
    if (req.body.password) {
        if (req.body.password.length < 5) {
            return next(createError(403, "Password is too short"))
        }
        try {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (err) {
            next(err)
        }
    }

    if (req.body.username) {
        if (req.body.username.length < 5 || req.body.username.length > 20) {
            return next(createError(403, "Username must be between 5 and 20 characters"))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(createError(403, "Username can only contain letters and numbers"))
        }
        if (req.body.username.includes(" ")) {
            return createError(403, "Username cannot contain spaces")
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(createError(403, "Username must be lowercase"))
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePic: req.body.profilePic
                }
            },
            { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId)
        if (!user) {
            return next(createError(404, "User not found"))
        }

        if (!req.user.isAdmin && req.user.id !== userId) {
            return next(createError(403, "You can delete only your account!"))
        }

        await User.findByIdAndDelete(userId)
        res.status(200).json("User has been deleted!")
    } catch (error) {
        next(createError(500, error.message || "Error deleting user"))
    }
}


export const signout = async (req, res, next) => {
    try {
        res
            .clearCookie("access_token")
            .status(200)
            .json("User has been signed out!")
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to see all users'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(error);
    }
}