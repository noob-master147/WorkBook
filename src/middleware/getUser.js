const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Guest } = require('../models/guestSchema')
const { Driver } = require('../models/driverSchema')
const { Role } = require('../models/RoleSchema')



const getUser = async(req, res, next) => {
    console.log(chalk.bold.yellow("\nChecking User Role..."))
    try {
        await Role.findOne({ 'userID': req.body.userID })
            .then(async(obj) => {
                console.log(obj)
                const role = obj.role
                let alias = null
                switch (role) {
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
                await alias.findOne({ 'userID': req.body.userID })
                    .then((user) => {
                        console.log(chalk.bold.green("User Fetched"))
                        req.body.user = user
                    })
                    .catch(() => {
                        throw new Error("Role not found")
                    })
            })
            .catch(() => {
                throw new Error("Role not found")
            })
        next()
    } catch (err) {
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