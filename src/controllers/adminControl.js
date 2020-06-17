const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Institute } = require('../models/instituteSchema')
const { Role } = require('../models/RoleSchema')
const brypt = require('bcrypt')
const { ObjectID } = require('mongodb')

const register = (user) => {
    return new Promise(async(resolve, reject) => {
        user.body.instituteImage = user.file.buffer
        console.log(chalk.bold.yellow("Registering Admin..."))
        const id = new ObjectID()
        admin = new Admin({
            _id: id,
            role: user.body.role,
            userName: user.body.userName,
            userID: user.body.userID,
            password: user.body.password,
            instituteName: user.body.instituteName,
            instituteType: user.body.instituteType,
            instituteImage: user.body.instituteImage,
            numberOfMembers: user.body.numberOfMembers,
            state: user.body.state,
            city: user.body.city,
            mailAddress: user.body.mailAddress,
            adharNumber: user.body.adharNumber,
            contactNumber: user.body.contactNumber,
            fcmToken: user.body.fcmToken,
            approved: false
        })
        institute = new Institute({
            _id: id,
            instituteName: user.body.instituteName,
            instituteType: user.body.instituteType,
            instituteImage: user.body.instituteImage,
        })
        role = new Role({
            _id: id,
            role: "admin"
        })

        Promise.all([
                admin.save(),
                institute.save(),
                role.save()
            ])
            .then(() => {
                console.log(chalk.bold.green("New Admin Added!"))
                console.log(chalk.bold.green("New Institute Added!"))
                console.log(chalk.bold.green("New Role Added!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Admin and Institute Successfully Added",
                    }
                })
            })
            .catch(async(err) => {
                console.log(chalk.red.bold("Error in Adding Admin!"))
                await Admin.findByIdAndDelete(id)
                await Institute.findByIdAndDelete(id)
                await Role.findByIdAndDelete(id)
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
        Admin.findOneAndUpdate({
                'userID': user.email
            }, {
                'fcmToken': user.fcmToken
            }, {
                new: true
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
                console.log(chalk.red.bold("Error in Loading Institute Data!"))
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

const approveEmployee = (employee) => {
    return new Promise(async(resolve, reject) => {
        await Employee.findByIdAndUpdate(employee.id, {
                'approved': true
            })
            .then(() => {
                console.log(chalk.bold.green("Employee Approved!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Employee Approved"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Employee Not Approved!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Approving Employee! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const rejectEmployee = (employee) => {
    return new Promise(async(resolve, reject) => {
        await Employee.findByIdAndDelete(employee.id)
            .then(() => {
                console.log(chalk.bold.green("Employee Rejected!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Employee Rejected"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Employee Not Rejected!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Rejecting Employee! Contact Support",
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
    getInstitutes,
    approveEmployee,
    rejectEmployee
}