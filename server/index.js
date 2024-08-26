import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./Database/db.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// cors setup
app.use(cors(
    {
        origin: "http://localhost:3000",
    }
));

// Home Page
app.get('/', (req, res) => {
    res.send("Hello Journivo's Server");
})

// App Routes
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)


// Error Middleware
app.use((error,req,res,next) => {
    const status = error.status || 500
    const message = error.message || "Something went wrong"
    res.status(status).json({
        status,
        message
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    connectDB();
})