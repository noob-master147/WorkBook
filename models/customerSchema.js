const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
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
    employeeID: {
        type: String,
        trim: true,
        required: true,
        default: '0',
    },
    instituteName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    mailAddress: {
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
    }
});




module.exports = {
    Customer: mongoose.model('Customer', customerSchema)
}