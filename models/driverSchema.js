const mongoose = require('mongoose')


const driverSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
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
    organization: {
        type: String,
        trim: true,
        required: true
    },
    carNumber: {
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
    Driver: mongoose.model('Driver', driverSchema)
}