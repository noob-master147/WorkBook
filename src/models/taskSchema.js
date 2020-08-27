const mongo = require('mongoose')

const assigneeSchema = new mongo.Schema({
    userID: {
        type: String,
        required: true,
        trim: true
    },
    fcmToken: {
        type: String,
        required: true,
        trim: true
    }
})


const taskSchema = new mongo.Schema({
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
        required: true,
        trim: true
    },
    division: {
        type: String,
        required: true,
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
    }
})


module.exports = {
    Task: mongoose.model('Task', taskSchema)
}