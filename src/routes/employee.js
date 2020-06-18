const router = require("express")();
const employeeControl = require('../controllers/employeeControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')


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


// route to create an Employee
router.post('/register', hashPassword, (req, res) => {
    console.log(chalk.bold.yellow("\nRegister Employee route hit..."))
    employeeControl.register(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})


// route to Login Employee
router.post('/login', (req, res) => {
    console.log(chalk.bold.yellow("\nLogin Employee route hit..."))
    employeeControl.login(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

//#######################YET TO DO########################
// route to update an employee
router.post('/update', (req, res) => {
    employeeControl.update(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})


// View Pending Customers
router.post('/viewAllCustomers', (req, res) => {
    employeeControl.viewAllCustomers(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// Approve a Customer
router.post('/approveCustomer', (req, res) => {
    employeeControl.approveCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// reject a Customer
router.post('/rejectCustomer', (req, res) => {
    employeeControl.rejectCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

module.exports = router;