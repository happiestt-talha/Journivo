import jwt from "jsonwebtoken"
import { createError } from "../error/error.js"
export const verifyUser = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "You are not authenticated"))
    }
    console.log('token: ', token)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid"))
        }
        req.user = user
        next()
    })
}