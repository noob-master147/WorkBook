const mongoose = require('mongoose')


const guestSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    organization: {
        type: String,
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
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
});




module.exports = {
    User: mongoose.model('Guest', guestSchema)
}