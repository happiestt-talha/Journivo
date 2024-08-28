import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET)
}
