const router = require("express")();
const employeeControl = require('../controllers/employeeControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')
const { authenticate } = require('../middleware/authenticate')
const { checkDuplicate } = require('../middleware/checkDuplicate')

// TEST ROUTE
router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The employee routes is healthy and running",
            routes: {
                register: "/register",
                login: "/login"
            }
        },
    }).status(200)
})


/** Register an Employee
 * @api {post} /employee/register Employee Register
 * @apiName Register
 * @apiGroup Employee
 *  
 * @apiParam {String} userName user name
 * @apiParam {String} userID email id
 * @apiParam {String} password password
 * @apiParam {String} instituteName Name of The Institute
 * @apiParam {String} grade Grade
 * @apiParam {String} division Division
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token  
 * 
 */ // Register an Employee
router.post('/register', checkDuplicate, hashPassword, (req, res) => {
    console.log(chalk.bold.yellow("\nRegister Employee route hit..."))
    employeeControl.register(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Login Employee
 * @api {post} employee/login Login Employee 
 * @apiName Login Employee
 * @apiGroup Employee
 * 
 */ // Login Employee
router.post('/login', (req, res) => {
    console.log(chalk.bold.yellow("\nLogin Employee route hit..."))
    employeeControl.login(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Update Employee
 * @api {post} /employee/update Update Employee
 * @apiName Update
 * @apiGroup Employee
 * 
 * @apiParam {String} id _id of the doc
 * @apiParam {String} userName user name
 * @apiParam {String} state State
 * @apiParam {String} city City
 * @apiParam {String} grade Grade
 * @apiParam {String} division Division
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Employee
 * 
 */ // Update Admin
router.post('/update', authenticate, (req, res) => {
    console.log(chalk.bold.yellow("\n/employee/update route hit..."))
    employeeControl.update(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** View All Customers
 * @api {post} employee/viewAllCustomers View Customers 
 * @apiName View Customers
 * @apiGroup Employee
 * 
 * @apiParam {String} instituteName Name of the Insitute
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Employee
 * 
 */ // View All Customers
router.post('/viewAllCustomers', authenticate, (req, res) => {
    console.log(chalk.bold.yellow("\n/employee/viewAllCustomers route hit..."))
    employeeControl.viewAllCustomers(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Approve a Customer
 * @api {post} employee/approveCustomer Approve Customer
 * @apiName Approve Customer
 * @apiGroup Employee
 *
 * @apiParam {String} employeeID userID of Employee
 * @apiParam {String} id _id of the Customer Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Employee
 *    
 */ // Approve a Customer
router.post('/approveCustomer', authenticate, (req, res) => {
    console.log(chalk.bold.yellow("\n/employee/approveCustomer route hit..."))
    employeeControl.approveCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Reject a Customer
 * @api {post} employee/rejectCustomer Reject Customer
 * @apiName Reject Customer
 * @apiGroup Employee
 *
 * @apiParam {String} employeeID userID of Employee
 * @apiParam {String} id _id of the Employee Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Employee
 *   
 */ // Reject a Customer
router.post('/rejectCustomer', authenticate, (req, res) => {
    console.log(chalk.bold.yellow("\n/employee/rejectCustomer route hit..."))
    employeeControl.rejectCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** Delete a Customer
 * @api {post} employee/deleteCustomer Delete Customer
 * @apiName Delete Customer
 * @apiGroup Employee
 *
 * @apiParam {String} employeeID userID of Employee
 * @apiParam {String} id _id of the Employee Document
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Employee
 * 
 *   
 */ // Delete a Customer
router.post('/deleteCustomer', authenticate, (req, res) => {
    console.log(chalk.bold.yellow("\n/employee/deleteCustomer route hit..."))
    employeeControl.deleteCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Active Customer
 * @api {post} employee/activeCustomer Active Customer
 * @apiName Active Customer
 * @apiGroup Employee
 *
 * @apiParam {String} employeeID userID of Employee
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} userID Email ID of Employee
 * 
 *   
 */ // Active Customer
router.post('/activeCustomer', authenticate, (req, res) => {
    console.log(chalk.bold.yellow("\n/employee/activeCustomer route hit..."))
    employeeControl.activeCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


module.exports = router;