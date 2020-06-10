const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Institute } = require('../models/instituteSchema')
const brypt = require('bcrypt')
const { ObjectID } = require('mongodb')

const register = (user) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        admin = new Admin({
            _id: id,
            role: user.role,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            instituteName: user.instituteName,
            instituteType: user.instituteType,
            instituteImage: user.instituteImage,
            numberOfMembers: user.numberOfMembers,
            state: user.state,
            district: user.district,
            city: user.city,
            mailAddress: user.mailAddress,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            approved: false
        })

        await admin.save()
            .then(async() => {
                console.log(chalk.bold.green("New Admin Added!"))
                await addInstitute({
                        instituteName: user.instituteName,
                        instituteType: user.instituteType,
                        instituteImage: user.instituteImage
                    })
                    .then(() => {
                        console.log(chalk.bold.green("New Institute Added!"))
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Admin and Institute Successfully Added",
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(chalk.red.bold("Error in Adding Institute!"))
                        reject({
                            statusCode: 400,
                            payload: {
                                msg: "Error in Adding Institute. Contact Support",
                                err: err
                            }
                        })
                    })
            })
            .catch((err) => {
                console.log("Error in Adding Admin!")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Admin. Contact Support",
                        err: err
                    }
                })
            })
    })
}

const login = (user) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Admin Logging in..."))
        const formPassword = user.password
        Admin.findOne({
                'userID': user.email
            })
            .then(async(admin) => {
                if (await brypt.compare(formPassword, admin.password) === true) {
                    console.log(chalk.green.bold('Admin Authenticated'))
                    if (admin.approved === true) {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Admin Logged In and Approved",
                                approved: admin.approved,
                                admin: admin
                            }
                        })
                    } else {
                        resolve({
                            statusCode: 200,
                            payload: {
                                msg: "Admin Logged In and Not Approved",
                                approved: admin.approved,
                                admin: admin
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
                console.log("Error in Logging In Admin!")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Logging In Admin! Contact Support",
                        err: "Email not found"
                    }
                })
            })
    })
}

const viewAllEmployees = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching All Employees..."))
        await Employee.find({
                'instituteName': obj.instituteName
            })
            .then((employees) => {
                console.log(chalk.green.bold("Fetched All Employees"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Employee in the Institute",
                        employees: employees
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Loading Employee Data")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Loading Employee Data! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const addInstitute = (obj) => {
    return new Promise(async(resolve, reject) => {
        const id = new ObjectID()
        institute = new Institute({
            _id: id,
            instituteName: obj.instituteName,
            instituteType: obj.instituteType,
            instituteImage: obj.instituteImage
        })
        await institute.save()
            .then(() => resolve(true))
            .catch((err) => reject("No Duplicates Allowed"))
    })
}

const getInstitutes = () => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Fetching Institutes..."))
        Institute.find()
            .then((institutes) => {
                console.log(chalk.bold.green("Institutes Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Institute Fetch Successful",
                        institute: institutes
                    }
                })
            })
            .catch((err) => {
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Loading Institute Data! Contact Support",
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
    viewAllEmployees,
    getInstitutes
}