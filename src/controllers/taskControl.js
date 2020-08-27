const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Driver } = require('../models/driverSchema')
const { Institute } = require('../models/instituteSchema')
const { Role } = require('../models/RoleSchema')
const bcrypt = require('bcrypt')
const { Query } = require('../models/querySchema')
const { Route } = require('../models/routeSchema')
const { Task } = require('../models/taskSchema')
const { ObjectID } = require('mongodb')


const serviceAccount = require("../../firebase-key.json")
const admin = require("firebase-admin")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
})

const adminCreate = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Creating Task..."))

        const id = new ObjectID()
        task = new Task({
            _id: id,
            instituteName: obj.instituteName,
            type: obj.type,
            description: obj.description,
            createdBy: obj.userID,
            universal: true
        })
        await task.save()
            .then(() => {
                console.log(chalk.bold.green("!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: ""
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in !"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in ! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


const employeeCreate = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Creating Task..."))
        const id = new ObjectID()
        task = new Task({
            _id: id,
            grade: obj.grade,
            division: obj.division,
            instituteName: obj.instituteName,
            type: obj.type,
            description: obj.description,
            createdBy: obj.userID,
            universal: false
        })
        await task.save()
            .then(() => {
                console.log(chalk.bold.green("!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: ""
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in !"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in ! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}



module.exports = {
    adminCreate,
    employeeCreate
}