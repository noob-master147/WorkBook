const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    }
});




module.exports = {
    Role: mongoose.model('Role', roleSchema)
}