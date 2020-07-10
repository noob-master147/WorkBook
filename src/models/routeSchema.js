const mongoose = require('mongoose')


const customer = new mongoose.Schema({
    customerID: {
        type: String,
        trim: true
    },
    customerName: {
        type: String,
        trim: true
    }
})


const employee = new mongoose.Schema({
    employeeID: {
        type: String,
        trim: true
    },
    employeeName: {
        type: String,
        trim: true
    }
})

const coordinateSchema = new mongoose.Schema({
    longitude: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
})



const routeSchema = new mongoose.Schema({
    driverID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    location: [coordinateSchema],
    customer: [customer],
    employee: [employee]
});




module.exports = {
    Route: mongoose.model('Route', routeSchema)
}