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
const { sendTopicNotification } = require('../helpers/topicNotification')

const adminCreate = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Creating Task..."))
        const id = new ObjectID()
        task = new Task({
            _id: id,
            name: obj.name,
            instituteName: obj.instituteName,
            type: obj.type,
            description: obj.description,
            createdBy: obj.userID,
            mediaUrl: obj.mediaUrl,
            universal: true
        })
        await task.save()
            .then(async() => {
                await sendTopicNotification({
                    title: obj.name,
                    message: `New ${obj.name} Received! Click here to view!`,
                    topic: obj.topic
                })
                console.log(chalk.bold.green("Task Created!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Task Created"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Creating Task!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Creating Task! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

/// Code the asignee for employee
const employeeCreate = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Creating Task..."))
        const id = new ObjectID()
        task = new Task({
            _id: id,
            name: obj.name,
            grade: obj.grade,
            division: obj.division,
            instituteName: obj.instituteName,
            type: obj.type,
            description: obj.description,
            createdBy: obj.userID,
            mediaUrl: obj.mediaUrl,
            universal: false
        })
        await task.save()
            .then(async() => {
                await sendTopicNotification({
                    title: obj.name,
                    message: `New ${obj.name} Received! Click here to view!`,
                    topic: obj.topic
                })
                console.log(chalk.bold.green("Task Created!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Task Created!"
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

const fetch = (obj) => {
    return new Promise(async(resolve, reject) => {
        const p1 = await Task.find({
            grade: obj.grade,
            division: obj.division,
            instituteName: obj.instituteName,
            universal: false
        })
        const p2 = await Task.find({
            instituteName: obj.instituteName,
            universal: true
        })
        Promise.all([p1, p2])
            .then((tasks) => {
                if (tasks == null) {
                    console.log(chalk.bold.green("No Tasks Found!"))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "No Tasks Found"
                        }
                    })
                } else {
                    console.log(chalk.bold.green("Tasks Found!"))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Tasks Found",
                            tasks: tasks
                        }
                    })
                }


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


const createdBy = (obj) => {
    return new Promise(async(resolve, reject) => {
        await Task.find({
                createdBy: obj.userID
            })
            .then((task) => {
                console.log(task)
                console.log(chalk.bold.green("Task Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Task Fetched",
                        task: task
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Tasks!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Tasks! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


module.exports = {
    adminCreate,
    employeeCreate,
    fetch,
    createdBy
}