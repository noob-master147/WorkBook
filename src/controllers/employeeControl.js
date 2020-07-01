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
            _id: id,
            fcmToken: user.fcmToken,
            userID: user.userID,
            role: "employee"

        })
        Promise.all([
                employee.save(),
                role.save()
            ])
            .then(() => {
                console.log(chalk.green.bold("New Employee Registered!"))
                resolve({
                    statusCode: 201,
                    payload: {
                        msg: "Employee Successfully Registered",
                    }
                })
            })
            .catch(async(err) => {
                console.log(chalk.red.bold("Error in Employee Registration!"))
                await Employee.findByIdAndDelete(id)
                await Role.findByIdAndDelete(id)
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

const update = (user) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Updating Employee"))
        await Employee.findByIdAndUpdate(user.id, {
                userName: user.userName,
                state: user.state,
                city: user.city,
                division: user.division,
                grade: user.grade,
                adharNumber: user.adharNumber,
                contactNumber: user.contactNumber,
                fcmToken: user.fcmToken
            }, {
                new: true
            })
            .then((employee) => {
                console.log(chalk.green.bold("Employee Updated"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Updated Employee",
                        employee: employee
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Updating Employee")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Employee! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const viewAllCustomers = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching All Customers..."))
        await Customer.find({
                'instituteName': obj.instituteName
            })
            .then((customer) => {
                console.log(chalk.green.bold("Fetched All Customer"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer in the Institute",
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
        const p1 = await Customer.findByIdAndDelete(customer.id)
        const p2 = await Role.findByIdAndDelete(customer.id)
        Promise.all([p1, p2])
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

const deleteCustomer = (customer) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Deleting Customer..."))
        const p1 = await Customer.findByIdAndDelete(customer.id)
        const p2 = await Role.findByIdAndDelete(customer.id)
        Promise.all([p1, p2])
            .then(() => {
                console.log(chalk.green.bold("Customer Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer Deleted"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Customer Not Deleted!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Deleting Customer! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const activeCustomer = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching All Active Customers..."))
        await Customer.find({
                'employeeID': obj.employeeID
            })
            .then((customer) => {
                console.log(chalk.green.bold("Fetched All Active  Customer"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Active Customer Under Employee",
                        customer: customer
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Loading Active Customer Data"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Active Loading Customer Data! Contact Support",
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
    viewAllCustomers,
    approveCustomer,
    rejectCustomer,
    activeCustomer,
    deleteCustomer,
    update
}