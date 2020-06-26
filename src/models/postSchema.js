const mongoose = require('mongoose')


const likedBySchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userName: {
        type: String,
        required: true,
        trim: true
    }
})


const commentSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    }
})




const postSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    likes: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    likedBy: [likedBySchema],
    comments: [commentSchema]
});




module.exports = {
    Post: mongoose.model('Post', postSchema)
}