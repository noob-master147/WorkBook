const router = require("express")();
const adminControl = require('../controllers/adminControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')
const { upload } = require('../middleware/multerUpload')
const { authenticate } = require('../middleware/authenticate')
const { checkDuplicate } = require('../middleware/checkDuplicate')


// TEST ROUTE
router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The admin routes is healthy and running"
        },
    }).status(200)
})



/** Register New Admin
 * @api {post} /admin/register Register Admin
 * @apiName Register
 * @apiGroup Admin
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} userID email id of Admin
 * @apiParam {String} password Password
 * @apiParam {String} instituteName Name of the Institute
 * @apiParam {String} instituteType Type of the Institute
 * @apiParam {String} instituteImageUrl URL of Institute Image
 * @apiParam {Number} numberOfMembers Number of Members in the Institute
 * @apiParam {String} state State
 * @apiParam {String} city City
 * @apiParam {String} mailAddress Mailing Address
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 */ //Register New Admin
router.post('/register', checkDuplicate, hashPassword, (req, res) => {
    console.log(chalk.yellow.bold("\nRegister Admin route hit..."))
    adminControl.register(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Login Admin
 * @api {post} /admin/login Login Admin
 * @apiName Login
 * @apiGroup Admin
 *
 * @apiParam {String} fcmToken FCM Device Token
 * @apiParam {String} userID Email ID of Admin
 * @apiParam {String} password Password
 */ // Login Admin
router.post('/login', (req, res) => {
    console.log(chalk.bold.yellow("\nLogin Admin route hit..."))
    adminControl.login(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Update Admin
 * @api {post} /admin/update Update Admin
 * @apiName Login
 * @apiGroup Admin
 * 
 * @apiParam {String} id _id of the doc
 * @apiParam {String} userID Email ID of Admin
 * @apiParam {String} userName user name
 * @apiParam {String} instituteType Type of the Institute
 * @apiParam {Number} numberOfMembers Number of Members in the Institute
 * @apiParam {String} state State
 * @apiParam {String} city City
 * @apiParam {String} mailAddress Mailing Address
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * @apiParam {String} jwtToken JWT Token of the User
 * 
 */ // Update Admin
router.post('/update', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/update route hit..."))
    adminControl.update(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** View all Employees
 * @api {post} /admin/viewAllEmployees View Institute's Employee
 * @apiName View All Employees
 * @apiGroup Admin
 * 
 * @apiParam {String} instituteName Name of the Institute
 * @apiParam {String} jwtToken JWT Token of the User
 *   
 */ // View all Employees
router.post('/viewAllEmployees', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/viewAllEmployees route hit..."))
    adminControl.viewAllEmployees(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** Approve an Employee
 * @api {post} /admin/approveEmployee Approve Employee
 * @apiName Approve Employee
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Employee Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // Approve an Employee
router.post('/approveEmployee', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/approveEmployee route hit..."))
    adminControl.approveEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Reject an Employee
 * @api {post} /admin/rejectEmployee Reject Employee
 * @apiName Reject Employee
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Employee Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // Reject an Employee
router.post('/rejectEmployee', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/rejectEmployee route hit..."))
    adminControl.rejectEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Delete an Employee
 * @api {post} /admin/deleteEmployee Delete Employee
 * @apiName Delete Employee
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Employee Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // Delete an Employee
router.post('/deleteEmployee', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/deleteEmployee route hit..."))
    adminControl.deleteEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** View all institutes
 * @api {get} /admin/institutes Get Registered Institutes
 * @apiName Institutes
 * @apiGroup Admin
 *
 *   
 */ // View all institutes
router.get('/institutes', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/institutes route hit..."))
    adminControl.getInstitutes()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Approve Driver
 * @api {post} /admin/approveDriver Approve Driver
 * @apiName Approve Driver
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Driver Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin

 */ // Approve an Driver
router.post('/approveDriver', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/approveDriver route hit..."))
    adminControl.approveDriver(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** View all Drivers
 * @api {post} /admin/viewAllDrivers View Institute's Drivers
 * @apiName View All Drivers
 * @apiGroup Admin
 * 
 * @apiParam {String} instituteName Name of the Institute
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // View all Drivers
router.post('/viewAllDrivers', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/viewAllDrivers route hit..."))
    adminControl.viewAllDrivers(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Reject an Driver
 * @api {post} /admin/rejectDriver Reject Driver
 * @apiName Reject Driver
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Driver Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // Reject an Driver
router.post('/rejectDriver', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/rejectDriver route hit..."))
    adminControl.rejectDriver(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Delete an Driver
 * @api {post} /admin/deleteDriver Delete Driver
 * @apiName Delete Driver
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Driver Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // Delete an Driver
router.post('/deleteDriver', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/deleteDriver route hit..."))
    adminControl.deleteDriver(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Grade & Division
 * @api {post} /admin/setGD Grade & Division
 * @apiName Grade & Division
 * @apiGroup Admin
 *
 * @apiParam {String} instituteName Name of the Institute
 * @apiParam {Array} grade
 * @apiParam {Array} division   
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 * 
 */ // Delete an Driver
router.post('/setGD', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/setGD route hit..."))
    adminControl.setGD(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Comment a Query
 * @api {post} /admin/queryComment Comment a Query
 * @apiName Comment a Query
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Query Document
 * @apiParam {String} comment Comment by Admin
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // Comment a Query
router.post('/queryComment', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/queryComment route hit..."))
    adminControl.queryComment(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Add User to Route
 * @api {post} /admin/addUserRoute Add User to Route
 * @apiName Add User to Route
 * @apiGroup Admin
 *
 * @apiParam {String} role Role of User
 * @apiParam {String} id _id of User
 * @apiParam {Object} route Route Object
 * @apiParam {String} jwtToken JWT Token of the Admin
 * @apiParam {String} userID Email ID of Admin
 *   
 */ // Add User to Route
router.post('/addUserRoute', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/addUserRoute route hit..."))
    adminControl.addUserRoute(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Create New Route
 * @api {post} /admin/createRoute Create New Route
 * @apiName Create New Route
 * @apiGroup Admin
 * 
 * @apiParam {String} driverID  _id of Driver
 * @apiParam {List} location List of JSON of Coordinates 
 * @apiParam {String} routeName Name of the Route
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 */ // Create Route
router.post('/createRoute', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/createRoute route hit..."))
    adminControl.createRoute(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Update Route
 * @api {post} /admin/updateRoute Update Route
 * @apiName Update Route
 * @apiGroup Admin
 * 
 * @apiParam {String} id  _id of Route
 * @apiParam {List} location List of JSON of Coordinates 
 * @apiParam {String} routeName Name of the Route
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 */ // Update Route
router.post('/updateRoute', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/updateRoute route hit..."))
    adminControl.updateRoute(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Delete Location
 * @api {post} /admin/deleteLocation Delete Location
 * @apiName Delete Location
 * @apiGroup Admin
 * 
 * @apiParam {String} routeID  _id of Route
 * @apiParam {String} locationID _id of Location Point
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 */ // Delete Location
router.post('/deleteLocation', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/deleteLocation route hit..."))
    adminControl.deleteLocation(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Delete Route
 * @api {post} /admin/deleteRoute Delete Route
 * @apiName Delete Route
 * @apiGroup Admin
 * 
 * @apiParam {String} id  _id of Route
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 */ // Delete Route
router.post('/deleteRoute', authenticate, (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/deleteRoute route hit..."))
    adminControl.deleteRoute(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Create Schedule
 * @api {post} /admin/createSchedule Create Schedule
 * @apiName Create Schedule
 * @apiGroup Admin
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 * @apiParam {String} grade Grade
 * @apiParam {String} division  Division
 * @apiParam {String} instituteName Institute Name
 * @apiParam {String} schedule Schedule Media URL

 */ // Create Schedule
router.post('/createSchedule', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/createSchedule route hit..."))
    adminControl.createSchedule(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Fetch Schedule
 * @api {post} /admin/fetchSchedule Create Schedule
 * @apiName Create Schedule
 * @apiGroup Admin
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 * @apiParam {String} grade Grade
 * @apiParam {String} division  Division
 * @apiParam {String} instituteName Institute Name

 */ // Fetch Schedule
router.post('/fetchSchedule', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/fetchSchedule route hit..."))
    adminControl.fetchSchedule(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Fetch Schedule
 * @api {post} /admin/fetchAllSchedule Fetch All Schedule in Institute
 * @apiName Fetch All Schedule in Institute
 * @apiGroup Admin
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 * @apiParam {String} instituteName Institute Name

 */ // Fetch All Schedule in Institute
router.post('/fetchAllSchedule', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/fetchAllSchedule route hit..."))
    adminControl.fetchAllSchedule(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Default Holidays
 * @api {get} /admin/defaultHolidays Fetch Default Holidays
 * @apiName Fetch Default Holidays
 * @apiGroup Admin
 * 
 */ // Fetch All Schedule in Institute
router.get('/defaultHolidays', (req, res) => {
    adminControl.defaultHolidays()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Set Holidays
 * @api {post} /admin/setHolidays Set Holidays
 * @apiName Set Holidays
 * @apiGroup Admin
 * @apiParam {String} userID userID of the Admin 
 * @apiParam {String} jwtToken JWT Token of the Admin
 * @apiParam {String} instituteName Institute Name
 * @apiParam {List} holidays List of Holiday Objects

 */ // Set Holidays
router.post('/setHolidays', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/setHolidays route hit..."))
    adminControl.setHolidays(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Update employee
 * @api {post} /admin/updateEmployee Update Employee
 * @apiName Set Holidays
 * @apiGroup Admin
 * @apiParam {String} id _id of User
 * @apiParam {String} data Data Object

 */ // Update Employee
router.post('/updateEmployee', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/updateEmployee route hit..."))
    adminControl.updateEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Update Driver
 * @api {post} /admin/updateDriver Update Driver
 * @apiName Set Holidays
 * @apiGroup Admin
 * @apiParam {String} id _id of User
 * @apiParam {String} data Data Object

 */ // Update Driver
router.post('/updateDriver', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/updateDriver route hit..."))
    adminControl.updateDriver(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Update Customer
 * @api {post} /admin/updateCustomer Update Customer
 * @apiName Set Holidays
 * @apiGroup Admin
 * @apiParam {String} id _id of User
 * @apiParam {String} data Data Object

 */ // Update Customer
router.post('/updateCustomer', (req, res) => {
    console.log(chalk.yellow.bold("\n/admin/updateCustomer route hit..."))
    adminControl.updateCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



module.exports = router;