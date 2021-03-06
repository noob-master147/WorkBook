const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        trim: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    fcmToken: {
        type: String,
        required: true,
        trim: true
    },
    passwordResetToken: {
        token: {
            type: String,
            trim: true
        },
        tokenExpire: {
            type: Date
        },
        tokenVerify: {
            type: Boolean,
            default: false
        }
    },
    userVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    instituteName: {
        type: String,
        trim: true
    }
});




module.exports = {
    Role: mongoose.model('Role', roleSchema)
}