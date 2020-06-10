const router = require("express")();
const adminControl = require('../controllers/adminControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')

// TEST ROUTE
router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The admin routes is healthy and running",
            routes: {
                register: "/register",
                login: "/login"
            }

        },
    }).status(200)
})


// Create New Admin
router.post('/register', hashPassword, (req, res) => {
    console.log(chalk.yellow.bold("\nCreate Admin route hit..."))
    adminControl.register(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})


// Login Admin
router.post('/login', (req, res) => {
    console.log(chalk.bold.yellow("\nLogin Admin route hit..."))
    adminControl.login(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// Update Admin
router.post('/update', (req, res) => {
    adminControl.update(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// View Particular Employee
router.post('/viewEmployee', (req, res) => {
    adminControl.viewEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// View all Employees
router.post('/viewAllEmployees', (req, res) => {
    console.log(chalk.bold.yellow("\nView All Employees route hit..."))
    adminControl.viewAllEmployees()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

// Approve an Employee
router.post('/approveEmployee', (req, res) => {
    adminControl.approveEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

// View all Organizations
router.get('/institutes', (req, res) => {
    console.log(chalk.bold.yellow("\nFetch All Institutes route hit..."))
    adminControl.getInstitutes()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


module.exports = router;