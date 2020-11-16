const chalk = require('chalk')
const { Admin } = require('../models/adminSchema')
const { Employee } = require('../models/employeeSchema')
const { Customer } = require('../models/customerSchema')
const { Driver } = require('../models/driverSchema')
const { Institute } = require('../models/instituteSchema')
const { Role } = require('../models/RoleSchema')
const bcrypt = require('bcrypt')
const { Query } = require('../models/querySchema')
const { Route } = require('../models/routeSchema')
const { ObjectID } = require('mongodb')

const register = (user) => {
    return new Promise(async (resolve, reject) => {
        console.log(chalk.bold.yellow("Registering Admin..."))
        const id = new ObjectID()
        admin = new Admin({
            _id: id,
            userName: user.userName,
            userID: user.userID,
            password: user.password,
            instituteName: user.instituteName,
            instituteType: user.instituteType,
            instituteImageUrl: user.instituteImageUrl,
            numberOfMembers: user.numberOfMembers,
            state: user.state,
            city: user.city,
            mailAddress: user.mailAddress,
            adharNumber: user.adharNumber,
            contactNumber: user.contactNumber,
            fcmToken: user.fcmToken,
            reference: user.reference,
            approved: false
        })
        institute = new Institute({
            _id: id,
            instituteName: user.instituteName,
            instituteType: user.instituteType,
            instituteImageUrl: user.instituteImageUrl
        })
        role = new Role({
            _id: id,
            fcmToken: user.fcmToken,
            userID: user.userID,
            role: "admin",
            instituteName: user.instituteName
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
            .catch(async (err) => {
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
    return new Promise(async (resolve, reject) => {
        console.log(chalk.yellow.bold("Admin Logging in..."))
        const formPassword = user.password
        await Admin.findOneAndUpdate({
            'userID': user.userID
        }, {
            'fcmToken': user.fcmToken
        }, {
            new: true
        })
            .then(async (admin) => {
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
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
        console.log(chalk.bold.yellow("Approving Employee..."))
        const p1 = await Employee.findByIdAndUpdate(employee.id, {
            approved: true
        })
        const p2 = await Role.findByIdAndUpdate(employee.id, {
            approved: true
        })
        Promise.all([p1, p2])
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
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
        console.log(chalk.bold.yellow("Deleting Eployee..."))
        const p1 = Employee.findByIdAndDelete(employee.id)
        const p2 = Role.findByIdAndDelete(employee.id)
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
    return new Promise(async (resolve, reject) => {
        console.log(chalk.yellow.bold("Approving Driver..."))
        const p1 = await Driver.findByIdAndUpdate(driver.id, {
            approved: true
        }, {
            new: true
        })
        const p2 = await Role.findByIdAndUpdate(driver.id, {
            approved: true
        })
        Promise.all([p1, p2])
            .then(() => {
                console.log(chalk.bold.green("Driver Approved!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Driver Approved"
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
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
        console.log(chalk.bold.yellow("Deleting Driver..."))
        const p1 = Driver.findByIdAndDelete(obj.id)
        const p2 = Role.findByIdAndDelete(obj.id)
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
    return new Promise(async (resolve, reject) => {
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

const queryComment = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log(chalk.yellow.bold("Adding Comment to Query"))
        await Query.findByIdAndUpdate(obj.id, {
            comment: obj.comment
        }, {
            new: true
        })
            .then((query) => {
                console.log(chalk.bold.green("Comment Added to Query!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Comment Added to Query",
                        query: query
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Adding Comment to the Query!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Comment to the Query! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const addUserRoute = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log(obj)
        const role = obj.role
        let alias = null
        switch (role) {
            case "employee":
                alias = Employee
                break;
            case "customer":
                alias = Customer
                break;
        }
        alias.findByIdAndUpdate(obj.id, {
            route: obj.route
        }, {
            new: true
        })
            .then((user) => {
                console.log(chalk.bold.green("Route Added to the User!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Route Added to the User",
                        user: user
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Adding Route to User!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Route to User! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const createRoute = (obj) => {
    return new Promise(async (resolve, reject) => {
        route = new Route({
            driverID: obj.driverID,
            location: obj.location,
            routeName: obj.routeName
        })
        await route.save()
            .then((obj) => {
                console.log(chalk.green.bold("New Route Registered!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Route Successfully Registered",
                        route: obj
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Route Registration!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Adding Route",
                        err: err
                    }
                })
            })
    })
}

const updateRoute = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log(chalk.yellow.bold("Updating Route..."))
        console.log(obj)
        await Route.findByIdAndUpdate(obj.id, {
            $push: {
                location: [{
                    latitude: obj.location.latitude,
                    longitude: obj.location.longitude,
                    name: obj.location.name
                }]
            },
            routeName: obj.routeName
        }, {
            new: true
        })
            .then((route) => {
                console.log(chalk.bold.green("Route Updated!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Route Updated",
                        route: route
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating Route!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Route! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const deleteRoute = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log(chalk.yellow.bold("Deleting Route..."))
        await Route.findByIdAndDelete(obj.id)
            .then(() => {
                console.log(chalk.bold.green("Route Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Route Deleted"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Deleting Route!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Deleting Route! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const deleteLocation = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log(chalk.yellow.bold("Deleting Location..."))
        await Route.findByIdAndUpdate(obj.routeID, {
            $pull: {
                location: { _id: obj.locationID }
            }
        }, {
            new: true
        })
            .then((route) => {
                console.log(chalk.bold.green("Location Deleted!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Location Deleted",
                        route: route
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Deleting Location!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Deleting Location! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const createSchedule = (obj) => {
    return new Promise(async (resolve, reject) => {
        // const institute = await Institute.findOne({
        //     instituteName: obj.instituteName
        // })
        // currentSchedule = institute.schedule
        // console.log(`${obj.grade}_${obj.division}`)
        // currentSchedule.forEach(element => {
        //     if (element.grade_division == `${obj.grade}_${obj.division}`) {
        //         console.log(chalk.bold.green("Schedule Already Exist!"))
        //         resolve({
        //             statusCode: 200,
        //             payload: {
        //                 msg: "Schedule Already Exist",
        //             }
        //         })
        //     }
        // })
        await Institute.findOneAndUpdate({
            instituteName: obj.instituteName
        }, {
            $push: {
                schedule: [{
                    grade_division: `${obj.grade}_${obj.division}`,
                    scheduleUrl: obj.schedule
                }]
            }
        }, {
            new: true
        })
            .then((insitute) => {
                console.log(chalk.bold.green("New Schedule Set!"))
                console.log(insitute.schedule)
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "New Schedule Set",
                        schedule: insitute.schedule
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Setting New Schedule!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Setting New Schedule! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const fetchSchedule = (obj) => {
    return new Promise(async (resolve, reject) => {
        await Institute.findOne({
            instituteName: obj.instituteName
        })
            .then((institute) => {
                let schedules = institute.schedule
                console.log(schedules)
                let url = false
                schedules.forEach(schedule => {
                    if (schedule.grade_division === `${obj.grade}_${obj.division}`)
                        url = schedule.scheduleUrl
                })
                if (!url) {
                    console.log(chalk.green.bold("Institute Schedule Does Not Exist"))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Institute Schedule Does Not Exist"
                        }
                    })
                } else {
                    console.log(chalk.green.bold("Schedule Fetched!"))
                    resolve({
                        statusCode: 200,
                        payload: {
                            msg: "Institute Schedule Fetched",
                            schedule: url
                        }
                    })
                }

            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Schedule!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Schedule! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const fetchAllSchedule = (obj) => {
    return new Promise(async (resolve, reject) => {
        await Institute.findOne({
            instituteName: obj.instituteName
        })
            .then((institute) => {
                console.log(chalk.bold.green("Institute Schedule Fetched!"))
                console.log(institute.schedule)
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Institute Schedule Fetched",
                        schedule: institute.schedule
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Fetching Institute Schedules!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Fetching Institute Schedules! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}

const defaultHolidays = () => {
    return new Promise(async (resolve, reject) => {
        holidays = [{
            name: "Republic Day",
            date: "1579996800000"
        },
        {
            name: "Independence Day",
            date: "1597449600000"
        },
        {
            name: "Gandhi Jayanti",
            date: "1601596800000"
        },
        {
            name: "Christmas",
            date: "1608854400000"
        },
        {
            name: "New Year",
            date: "1577836800000"
        },
        {
            name: "Dr. B. R. Ambedkar's Jayanti",
            date: "1586822400000"
        }
        ]
        resolve({
            statusCode: 200,
            payload: {
                msg: "Default Holidays",
                holidays: holidays
            }
        })
    })
}

const setHolidays = (obj) => {
    return new Promise(async (resolve, reject) => {
        console.log(obj)
        await Institute.findOneAndUpdate({
            instituteName: obj.instituteName
        }, {
            holidays: obj.holidays
        })
            .then(() => {
                console.log(chalk.bold.green("Holidays Set!"))
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Holidays Set"
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Setting Holidays!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Setting Holidays! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}


const updateEmployee = ({ id, data }) => {
    return new Promise(async (resolve, reject) => {
        console.log(id, data)
        await Employee.findByIdAndUpdate(id, data, { new: true })
            .then((emp) => {
                console.log(chalk.bold.green("Employee updated!"))
                console.log(emp)
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Employee updated",
                        emp
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating Employee!"))
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



const updateCustomer = ({ id, data }) => {
    return new Promise(async (resolve, reject) => {
        console.log(id, data)
        await Customer.findByIdAndUpdate(id, data, { new: true })
            .then((customer) => {
                console.log(chalk.bold.green("Customer updated!"))
                console.log(customer)
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Customer updated",
                        customer
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating Customer!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Customer! Contact Support",
                        Error: "Issue in connecting to the Datebase",
                        err: err
                    }
                })
            })
    })
}




const updateDriver = ({ id, data }) => {
    return new Promise(async (resolve, reject) => {
        console.log(id, data)
        await Driver.findByIdAndUpdate(id, data, { new: true })
            .then((driver) => {
                console.log(chalk.bold.green("Driver updated!"))
                console.log(emp)
                resolve({
                    statusCode: 200,
                    payload: {
                        msg: "Driver updated",
                        emp
                    }
                })
            })
            .catch((err) => {
                console.log(chalk.red.bold("Error in Updating Driver!"))
                reject({
                    statusCode: 400,
                    payload: {
                        msg: "Error in Updating Driver! Contact Support",
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
    setGD,
    queryComment,
    addUserRoute,
    createRoute,
    updateRoute,
    deleteRoute,
    deleteLocation,
    createSchedule,
    fetchSchedule,
    fetchAllSchedule,
    defaultHolidays,
    setHolidays,
    updateEmployee,
    updateCustomer,
    updateDriver
}