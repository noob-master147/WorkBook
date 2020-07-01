const mongoose = require('mongoose')


const querySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    fcmToken: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});




module.exports = {
    Query: mongoose.model('Query', querySchema)
}