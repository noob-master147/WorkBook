const router = require("express")();
const adminControl = require('../controllers/adminControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')
const { upload } = require('../middleware/multerUpload')


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
 * @apiParam {String} userName user name
 * @apiParam {String} userID email id
 * @apiParam {String} password password
 * @apiParam {String} instituteName Name of the Institute
 * @apiParam {String} instituteType Type of the Institute
 * @apiParam {File} instituteImage Image of the Institute
 * @apiParam {Number} numberOfMembers Number of Members in the Institute
 * @apiParam {String} state State
 * @apiParam {String} city City
 * @apiParam {String} mailAddress Mailing Address
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 */ //Register New Admin
router.post('/register', upload.single('instituteImage'), hashPassword, (req, res) => {
    console.log(chalk.yellow.bold("\nRegister Admin route hit..."))
    adminControl.register(req)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})



/** Login Admin
 * @api {post} /admin/login Login Admin
 * @apiName Login
 * @apiGroup Admin
 *
 * @apiParam {String} fcmToken FCM Device Token
 * @apiParam {String} Email ID userID of Admin
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
 * @apiParam {String} userName user name
 * @apiParam {String} instituteType Type of the Institute
 * @apiParam {Number} numberOfMembers Number of Members in the Institute
 * @apiParam {String} state State
 * @apiParam {String} city City
 * @apiParam {String} mailAddress Mailing Address
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 */ // Update Admin
router.post('/update', (req, res) => {
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
 *   
 */ // View all Employees
router.post('/viewAllEmployees', (req, res) => {
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
 *   
 */ // Approve an Employee
router.post('/approveEmployee', (req, res) => {
    adminControl.approveEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Reject an Employee
 * @api {post} /admin/approveEmployee Reject Employee
 * @apiName Reject Employee
 * @apiGroup Admin
 *
 * @apiParam {String} id _id of the Employee Document
 *   
 */ // Reject an Employee
router.post('/rejectEmployee', (req, res) => {
    adminControl.rejectEmployee(req.body)
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


module.exports = router;