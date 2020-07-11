const mongoose = require('mongoose')


const route = new mongoose.Schema({
    area: {
        type: String,
        trim: true
    },
    boardingPoint: {
        longitude: {
            type: Number,
            trim: true
        },
        latitude: {
            type: Number,
            trim: true
        },
        locationName: {
            type: String,
            trim: true
        }

    },
    droppingPoint: {
        longitude: {
            type: Number,
            trim: true
        },
        latitude: {
            type: Number,
            trim: true
        },
        locationName: {
            type: String,
            trim: true
        }
    },
    pickUpTime: {
        type: String,
        trim: true
    },
    cost: {
        type: Number,
        trim: true
    }
})



const customerSchema = new mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true,
        default: "customer"
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    userID: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    profilePictureUrl: {
        type: String
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
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        default: "secondary"
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
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    route: [route]
});




module.exports = {
    Customer: mongoose.model('Customer', customerSchema)
}