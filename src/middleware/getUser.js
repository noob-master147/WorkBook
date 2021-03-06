const chalk = require('chalk')
const { SuperAdmin } = require('../models/superAdminSchema')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Guest } = require('../models/guestSchema')
const { Driver } = require('../models/driverSchema')
const { Role } = require('../models/RoleSchema')



const getUser = async(req, res, next) => {
    console.log(chalk.bold.cyanBright("\nChecking User Role..."))
    try {

        if (req.body.fcmToken) {
            let alias = null
            await Role.findOneAndUpdate({
                    userID: req.body.userID
                }, {
                    fcmToken: req.body.fcmToken
                }, {
                    new: true
                })
                .then(async(obj) => {
                    const role = obj.role
                    switch (role) {
                        case "superAdmin":
                            alias = SuperAdmin
                            break;
                        case "admin":
                            alias = Admin
                            break;
                        case "employee":
                            alias = Employee
                            break;
                        case "customer":
                            alias = Customer
                            break;
                        case "driver":
                            alias = Driver
                            break;
                        case "guest":
                            alias = Guest
                            break;
                    }
                    await alias.findOneAndUpdate({
                            'userID': req.body.userID
                        }, {
                            'fcmToken': req.body.fcmToken
                        }, {
                            new: true
                        })
                        .then((user) => {
                            if (!user)
                                throw new Error("No User Exist")
                            console.log(chalk.bold.green("User Document Fetched"))
                            req.body.user = user
                            next()
                        })
                        .catch(() => {
                            throw new Error("User Ducument not found")
                        })
                })
                .catch(() => {
                    throw new Error("Role not found")
                })
        } else {
            let alias = null
            await Role.findOne({
                    userID: req.body.userID
                })
                .then(async(obj) => {
                    const role = obj.role
                    switch (role) {
                        case "superAdmin":
                            alias = SuperAdmin
                            break;
                        case "admin":
                            alias = Admin
                            break;
                        case "employee":
                            alias = Employee
                            break;
                        case "customer":
                            alias = Customer
                            break;
                        case "driver":
                            alias = Driver
                            break;
                        case "guest":
                            alias = Guest
                            break;
                    }
                    await alias.findOne({
                            'userID': req.body.userID
                        })
                        .then((user) => {
                            if (!user)
                                throw new Error("No User Exist")
                            console.log(chalk.bold.green("User Document Fetched"))
                            req.body.user = user
                            next()
                        })
                        .catch(() => {
                            throw new Error("User Ducument not found")
                        })
                })
                .catch(() => {
                    throw new Error("Role not found")
                })
        }

    } catch (err) {
        console.log(chalk.red.bold("User Role not Found!!"))
        res.send({
            statusCode: 500,
            payload: {
                msg: "Contact Support",
                err: err

            },
        }).status(500)
    }

}

module.exports = {
    getUser
}