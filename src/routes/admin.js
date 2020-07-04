const router = require("express")();
const adminControl = require('../controllers/adminControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')
const { upload } = require('../middleware/multerUpload')
const { authenticate } = require('../middleware/authenticate')

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
router.post('/register', hashPassword, (req, res) => {
    console.log(chalk.yellow.bold("\nRegister Admin route hit..."))
    adminControl.register(req.body)
        .then((obj) => res.send(obj).status(201))
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
    console.log(chalk.bold.yellow("\nView All Employees route hit..."))
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
    console.log(chalk.bold.yellow("\nFetch All Institutes route hit..."))
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
    console.log(chalk.bold.yellow("\nView All Driver route hit..."))
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
    adminControl.queryComment(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})






module.exports = router;