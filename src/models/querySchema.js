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
    instituteName: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        default: 'created'
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
    }
});




module.exports = {
    Query: mongoose.model('Query', querySchema)
}