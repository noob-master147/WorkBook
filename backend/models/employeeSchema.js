const mongoose = require('mongoose')
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    userID: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
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
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
});




module.exports = {
    User: mongoose.model('Employee', employeeSchema)
}