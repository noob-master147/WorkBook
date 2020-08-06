const chalk = require('chalk')
const brypt = require('bcrypt')
const { SuperAdmin } = require('../models/superAdminSchema')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Institute } = require('../models/instituteSchema')
const { Driver } = require('../models/driverSchema')
const { Guest } = require('../models/guestSchema')
const { Role } = require('../models/RoleSchema')
const { Post } = require('../models/postSchema')
const { Query } = require('../models/querySchema')
const { Route } = require('../models/routeSchema')
const { ObjectID } = require('mongodb')


const create = (user) => {
    return new Promise(async(resolve, reject) => {
        await Role.findOne({
                role: "superAdmin",
                userID: user.userID
            })
            .then((obj) => {
                if (obj) {
                    reject({
                        statusCode: 400,
                        payload: {
                            msg: "SuperAdmin Already Exists. Contact Support"
                        }
                    })
                }
            })

        console.log(chalk.bold.yellow("Creating SuperAdmin..."))
        const id = new ObjectID()
        superAdmin = new SuperAdmin({
            _id: id,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            fcmToken: user.fcmToken,
        })

        role = new Role({
            _id: id,
            fcmToken: user.fcmToken,
            userID: user.userID,
            role: "superAdmin"
        })
        const p1 = superAdmin.save()
        const p2 = role.save()

        Promise.all([p1, p2])
            .then((superAdmin) => {
                console.log(chalk.bold.green("SuperAdmin Created!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "SuperAdmin Created",
                        superAdmin: superAdmin
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("SuperAdmin Not Created!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Creating SuperAdmin! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })

    })
}

const approveAdmin = (admin) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Approving Admin..."))
        const p1 = await Admin.findByIdAndUpdate(admin.id, {
            'approved': true
        })
        const p2 = await Role.findByIdAndUpdate(admin.id, {
            approved: true
        })
        Promise.all([p1, p2])
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

const rejectAdmin = (admin) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Rejecting Admin..."))
        const p1 = await Admin.findByIdAndDelete(admin.id)
        const p2 = await Role.findByIdAndDelete(admin.id)
        Promise.all([p1, p2])
            .then(() => {
                console.log(chalk.bold.green("Admin Rejected and Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Admin Rejected and Deleted"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Admin Not Rejected!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Rejecting Admin! Contact Support",
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
        const p7 = await SuperAdmin.remove({}, function(err) {
            console.log(chalk.red.bold('SuperAdmin collection removed'))
        })
        const p8 = await Post.remove({}, function(err) {
            console.log(chalk.red.bold('Post collection removed'))
        })
        const p9 = await Query.remove({}, function(err) {
            console.log(chalk.red.bold('Querry collection removed'))
        })
        const p10 = await Guest.remove({}, function(err) {
            console.log(chalk.red.bold('Guest collection removed'))
        })
        const p11 = await Route.remove({}, function(err) {
            console.log(chalk.red.bold('Route collection removed'))
        })

        Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11])
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

const deleteAdmin = (admin) => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.yellow("Deleteing Admin..."))
        const p1 = await Admin.findByIdAndDelete(admin.id)
        const p2 = await Role.findByIdAndDelete(admin.id)
        Promise.all([p1, p2])
            .then(() => {
                console.log(chalk.bold.green("Admin Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Admin Deleted"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Admin Not Deleted!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Deleting Admin! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const viewAllAdmin = () => {
    return new Promise(async(resolve, reject) => {
        await Admin.find()
            .then((admin) => {
                console.log(chalk.bold.green("Admin Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Admin Fetched",
                        admin: admin
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Admin Not Fetched!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Admin! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const getSuperAdmin = () => {
    return new Promise(async(resolve, reject) => {
        console.log(chalk.bold.green("SuperAdmin Fetching..."))
        await SuperAdmin.find()
            .then((superAdmin) => {
                console.log(chalk.bold.green("SuperAdmin Fetched!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "SuperAdmin Fetched",
                        superAdmin: superAdmin
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("SuperAdmin Not Fetched!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching SuperAdmin! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}





module.exports = {
    create,
    approveAdmin,
    rejectAdmin,
    purge,
    deleteAdmin,
    viewAllAdmin,
    getSuperAdmin
}