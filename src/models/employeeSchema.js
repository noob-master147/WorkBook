const mongoose = require('mongoose')
const validator = require('validator');
const jwt = require('jsonwebtoken')

const employeeSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true,
        default: "employee"
    },
    userName: {
        type: String,
        trim: true,
        required: true,
    },
    userID: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    profilePicture: {
        type: String
    },
    instituteName: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    grade: {
        type: String,
        trim: true,
        required: true
    },
    division: {
        type: String,
        trim: true,
        required: true
    },
    adharNumber: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});




module.exports = {
    Employee: mongoose.model('Employee', employeeSchema)
}