const chalk = require('chalk')
const { Employee } = require('../models/employeeSchema')
const brypt = require('bcrypt')
const { ObjectID } = require('mongodb')


const register = (user) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        employee = new Employee({
            _id: id,
            role: user.role,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            grade: user.grade,
            division: user.division,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            approved: false
        })
        await employee.save()
            .then(() => {
                console.log("New Employee Added!")
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Employee Successfully Added",
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Employee Admin!")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Employee Admin",
                        err: err
                    }
                })
            })
    })
}

const login = (user) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("\nEmployee Logging in..."))
        const formPassword = user.password
        Employee.findOne({
                'userID': user.email
            })
            .then(async(employee) => {
                if (await brypt.compare(formPassword, employee.password) === true) {
                    console.log(chalk.green.bold('Employee Authenticated'))
                    if (employee.approved === true) {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Employee Logged In and Approved",
                                approved: employee.approved,
                                employee: employee
                            }
                        })
                    } else {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Employee Logged In and Not Approved",
                                approved: employee.approved,
                                employee: employee
                            }
                        })
                    }
                } else {
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Password Incorrect",
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Logging In Employee!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Logging In Employee! Contact Support",
                        err: "Email not found"
                    }
                })
            })
    })
}

module.exports = {
    register,
    login
}