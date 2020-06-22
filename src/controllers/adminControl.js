const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Driver } = require('../models/driverSchema')
const { Institute } = require('../models/instituteSchema')
const { Role } = require('../models/RoleSchema')
const bcrypt = require('bcrypt')
const sharp = require('sharp')
const { ObjectID } = require('mongodb')

const register = (user) => {
    return new Promise(async(resolve, reject) => {
        user.body.instituteImage = await sharp(user.file.buffer).resize({ width: 500, height: 500 }).png().toBuffer()
        console.log(chalk.bold.yellow("Registering Admin..."))
        const id = new ObjectID()
        admin = new Admin({
            _id: id,
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
            userID: user.body.userID,
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
        await Admin.findOneAndUpdate({
                'userID': user.userID
            }, {
                'fcmToken': user.fcmToken
            }, {
                new: true
            })
            .then(async(admin) => {
                if (await bcrypt.compare(formPassword, admin.password) === true) {
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

const update = (user) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Updating Admin"))
        await Admin.findByIdAndUpdate(user.id, {
                userName: user.userName,
                instituteType: user.instituteType,
                numberOfMembers: user.numberOfMembers,
                state: user.state,
                city: user.city,
                mailAddress: user.mailAddress,
                adharNumber: user.adharNumber,
                contactNumber: user.contactNumber,
                fcmToken: user.fcmToken
            }, {
                new: true
            })
            .then((admin) => {
                console.log(chalk.green.bold("Admin Updated"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Updated Admin",
                        admin: admin
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Updating Admin")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Admin! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
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

const approveEmployee = (employee) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Approving Employee..."))
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
        console.log(chalk.bold.yellow("Rejecting Employee..."))
        const p1 = await Employee.findByIdAndDelete(employee.id)
        const p2 = await Role.findByIdAndDelete(employee.id)
        Promise.all([p1, p2])
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

const deleteEmployee = (employee) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Deleting Eployee..."))
        const p1 = await Employee.findByIdAndDelete(employee.id)
        const p2 = await Role.findByIdAndDelete(employee.id)
        Promise.all([p1, p2])
            .then(() => {
                console.log(chalk.bold.green("Employee Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Employee Deleted"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Employee Not Deleted!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Deleting Employee! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const approveDriver = (driver) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Approving Driver..."))
        Driver.findByIdAndUpdate(driver.id, {
                'approved': true
            }, {
                new: true
            })
            .then((driver) => {
                console.log(chalk.bold.green("Driver Approved!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Driver Approved",
                        driver: driver
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Driver Not Approved!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Approving Driver! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const viewAllDrivers = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Fetching All Drivers..."))
        await Driver.find({
                'instituteName': obj.instituteName
            })
            .then((drivers) => {
                console.log(chalk.green.bold("Fetched All Drivers"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Drivers in the Institute",
                        drivers: drivers
                    }
                })
            })
            .catch((err) => {
                console.log("Error in Loading Drivers Data")
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Loading Drivers Data! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const rejectDriver = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Rejecting Driver..."))
        const p1 = await Driver.findByIdAndDelete(obj.id)
        const p2 = await Role.findByIdAndDelete(obj.id)
        Promise.all([p1, p2])
            .then(() => {
                console.log(chalk.bold.green("Driver Rejected!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Driver Rejected"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Driver Not Rejected!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Rejecting Driver! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const deleteDriver = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Deleting Driver..."))
        const p1 = await Driver.findByIdAndDelete(obj.id)
        const p2 = await Role.findByIdAndDelete(obj.id)
        Promise.all([p1, p2])
            .then(() => {
                console.log(chalk.bold.green("Driver Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Driver Deleted"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Driver Not Deleted!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Deleting Driver! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const setGD = (obj) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.yellow.bold("Setting Grades and Division"))
        Institute.findOneAndUpdate({
                instituteName: obj.instituteName
            }, {
                grade: obj.grade,
                division: obj.division
            }, {
                new: true
            })
            .then((institute) => {
                console.log(chalk.bold.green("Institute Grade and Division Set!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Institute Grade and Division Set",
                        institute: institute
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Institute Grade and Division Not Set!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Setting Institute Grade and Division! Contact Support",
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
    update,
    viewAllEmployees,
    getInstitutes,
    approveEmployee,
    rejectEmployee,
    deleteEmployee,
    approveDriver,
    viewAllDrivers,
    rejectDriver,
    deleteDriver,
    setGD
}