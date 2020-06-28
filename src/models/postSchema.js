const mongoose = require('mongoose')


const likedBySchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    userName: {
        type: String,
        trim: true
    },
    userID: {
        type: String,
        trim: true
    }

})


const commentSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    userName: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true,
    }
})




const postSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
    },
    mediaType: {
        type: String,
    },
    mediaUrl: {
        type: String,
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    commentEnabled: {
        type: Boolean,
        required: true,
        default: true
    },
    likes: {
        type: Number,
        trim: true,
        required: true,
        default: 0
    },
    views: {
        type: Number,
        trim: true,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    likedBy: [likedBySchema],
    comments: [commentSchema]
});




module.exports = {
    Post: mongoose.model('Post', postSchema)
}