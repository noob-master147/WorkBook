const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const guestSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true
    },
    organization: {
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
    emailId: {
        type: String,
        trim: true,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
});




module.exports = {
    Guest: mongoose.model('Guest', guestSchema)
}