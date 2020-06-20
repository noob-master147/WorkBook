const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const superAdminSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "superAdmin"
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    fcmToken: {
        type: String,
        required: true
    }
});









module.exports = {
    SuperAdmin: mongoose.model('SuperAdmin', superAdminSchema)
}