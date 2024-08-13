import { createError } from "../error/error.js";
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { generateToken } from '../tokens/generateToken.js'

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password || username === "" || email === "" || password === "") {
            return next(createError(400, "Please fill all the fields"));
        }

        const user = await User.findOne({ email });
        if (user) {
            return next(createError(400, "User already exists"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const token = generateToken(newUser._id)

        const { password: others, ...rest } = newUser._doc

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(rest);
    } catch (error) {
        next(error);
        console.log('Sign up error', error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        return next(createError(400, "Please fill all the fields"));
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return next(createError(400, "User not found"));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password"));
        }

        const token = generateToken(user._id)

        const { password: others, ...rest } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(rest);
    } catch (error) {
        next(createError(500, error));
    }
}