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
        default: "SuperAdmin"
    },
    userID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: "superAdmin@superadmin.com"
    },
    password: {
        type: String,
        required: true,
        trim: true,
        default: "workbook@superadmin"
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    fcmToken: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: true
    },
    userVerified: {
        type: Boolean,
        default: false
    }
});









module.exports = {
    SuperAdmin: mongoose.model('SuperAdmin', superAdminSchema)
}