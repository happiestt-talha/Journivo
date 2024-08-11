import { createError } from "../error/error.js";
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(createError(400, "Please fill all the fields"));
    }

    const user = await User.findOne({ email });
    if (user) {
        next(createError(400, "User already exists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })
    
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
}