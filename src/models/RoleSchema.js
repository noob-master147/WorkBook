const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        trim: true
    }
});




module.exports = {
    Role: mongoose.model('Role', roleSchema)
}