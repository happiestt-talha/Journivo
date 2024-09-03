import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
)


export default mongoose.model('Comment', commentSchema)