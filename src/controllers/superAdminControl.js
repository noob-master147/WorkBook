const chalk = require('chalk')
const brypt = require('bcrypt')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Institute } = require('../models/instituteSchema')
const { Driver } = require('../models/driverSchema')
const { Role } = require('../models/RoleSchema')
const { ObjectID } = require('mongodb')



const approveAdmin = (admin) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Approving Admin..."))
        await Admin.findByIdAndUpdate(admin.id, {
                'approved': true
            })
            .then(() => {
                console.log(chalk.bold.green("Admin Approved!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Admin Approved"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Admin Not Approved!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Approving Admin! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const purge = () => {
    return new Promise(async(resolve, reject) => {
        const p1 = await Admin.remove({}, function(err) {
            console.log(chalk.red.bold('Admin collection removed'))
        })
        const p2 = await Employee.remove({}, function(err) {
            console.log(chalk.red.bold('Employee collection removed'))
        })
        const p3 = await Institute.remove({}, function(err) {
            console.log(chalk.red.bold('Institute collection removed'))
        })
        const p4 = await Customer.remove({}, function(err) {
            console.log(chalk.red.bold('Customer collection removed'))
        })
        const p5 = await Driver.remove({}, function(err) {
            console.log(chalk.red.bold('Driver collection removed'))
        })
        const p6 = await Role.remove({}, function(err) {
            console.log(chalk.red.bold('Role collection removed'))
        })

        Promise.all([p1, p2, p3, p4, p5, p6])
            .then(() => {
                console.log(chalk.red.bold("ALL DATABASE PURGED"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "All DB Purged"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("DataBase Not Purged!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Purging DataBase! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


module.exports = {
    approveAdmin,
    purge
}