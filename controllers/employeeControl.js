const chalk = require('chalk')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
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
            instituteName: user.instituteName,
            grade: user.grade,
            division: user.division,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            approved: false
        })
        await employee.save()
            .then(() => {
                console.log(chalk.green.bold("New Employee Registered!"))
                resolve({
                    statusCode: 201,
                    payload: {
                        msg: "Employee Successfully Registered",
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Employee Registration!"))
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

const viewAllCustomer = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching All Customers..."))
        await Customer.find({
                'associateName': obj.associateName
            })
            .then((customer) => {
                console.log(chalk.green.bold("Fetched All Customer"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer under the Employee",
                        customer: customer
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Loading Customer Data")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Loading Customer Data! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}




module.exports = {
    register,
    login,
    viewAllCustomer
}