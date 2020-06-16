const chalk = require('chalk')
const brypt = require('bcrypt')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Institute } = require('../models/instituteSchema')
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




module.exports = {
    approveAdmin
}