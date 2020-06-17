const chalk = require('chalk')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Role } = require('../models/RoleSchema')
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
            fcmToken: user.fcmToken,
            approved: false
        })
        role = new Role({
            userId: id,
            role: "employee"

        })
        const P1 = await employee.save()
        const P2 = role.save()

        Promise.all([P1, P2])
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
        Employee.findOneAndUpdate({
                'userID': user.email
            }, {
                'fcmToken': user.fcmToken
            }, {
                new: true
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

const pendingCustomers = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching All Pending Customers..."))
        await Customer.find({
                'instituteName': obj.instituteName,
                'approved': false
            })
            .then((customer) => {
                console.log(chalk.green.bold("Fetched All Pending Customer"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Pending Customer in the Institute",
                        customer: customer
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Loading Customer Data"))
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

const viewCustomers = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching All Customers..."))
        await Customer.find({
                'employeeID': obj.employeeID,
                'approved': true
            })
            .then((customer) => {
                console.log(chalk.green.bold("Fetched All Customer under the Employee"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer under the Employee",
                        customer: customer
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Loading Customer Data"))
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

const approveCustomer = (customer) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Approving Customer..."))
        await Customer.findByIdAndUpdate(customer.id, {
                'approved': true,
                'employeeID': customer.employeeID
            })
            .then(() => {
                console.log(chalk.green.bold("Customer Approved!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer Approved"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Customer Not Approved!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Approving Customer! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const rejectCustomer = (customer) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Approving Customer..."))
        await Customer.findByIdAndDelete(customer.id)
            .then(() => {
                console.log(chalk.green.bold("Customer Rejected!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer Approved"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Customer Not Rejected!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Rejecting Customer! Contact Support",
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
    pendingCustomers,
    viewCustomers,
    approveCustomer,
    rejectCustomer
}