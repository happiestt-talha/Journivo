import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

import connectDB from "./Database/db.js";
dotenv.config();
const app = express();
app.use(express.json());


// Home Page
app.get('/', (req, res) => {
    res.send("Hello Journivo's Server");
})

// App Routes
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)


// Error Middleware
app.use((error,req,res,next) => {
    const statuscode = error.statusCode || 500
    const message = error.message
    res.status(statuscode).json({
        statuscode,
        message
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    connectDB();
})