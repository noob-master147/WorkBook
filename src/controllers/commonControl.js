const chalk = require('chalk')
const serviceAccount = require("../../firebase-key.json")
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Institute } = require('../models/instituteSchema')
const { Driver } = require('../models/driverSchema')
const { Role } = require('../models/RoleSchema')

const admin = require("firebase-admin")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
})

const sendNotification = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Sending Notification..."))
        const fcmToken = obj.fcmToken;
        const payload = {
            notification: {
                title: obj.title,
                body: obj.message
            }
        }

        await admin.messaging().sendToDevice(fcmToken, payload)
            .then((response) => {
                console.log(chalk.bold.green("Notification Sent!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Notification Sent",
                        response: response
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Notification Not Sent!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Sending Notification! Contact Support",
                        Error: "Issue in connecting to the Firebase",
                        err: err
                    }
                })
            })
    })
}



const login = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(obj)
        resolve()
    })
}




module.exports = {
    sendNotification,
    login
}