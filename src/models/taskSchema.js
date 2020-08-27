const mongoose = require('mongoose')

const assigneeSchema = new mongoose.Schema({
    userID: {
        type: String,
        trim: true
    }
})


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "task",
        trim: true
    },
    description: {
        type: String,
        required: true,
        default: "New Task",
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    grade: {
        type: String,
        trim: true
    },
    division: {
        type: String,
        trim: true
    },
    instituteName: {
        type: String,
        required: true,
        trim: true
    },
    assignee: [assigneeSchema],
    createdBy: {
        type: String,
        required: true
    },
    universal: {
        type: Boolean
    }
})


module.exports = {
    Task: mongoose.model('Task', taskSchema)
}