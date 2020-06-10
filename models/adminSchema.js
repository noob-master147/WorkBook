const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
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
    instituteName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    instituteType: {
        type: String,
        required: true,
        trim: true
    },
    instituteImage: {
        type: String,
        required: true
    },
    numberOfMembers: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    district: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
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
    approved: {
        type: Boolean,
        required: true,
        default: false
    }
});




module.exports = {
    Admin: mongoose.model('Admin', adminSchema)
}