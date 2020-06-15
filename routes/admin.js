const router = require("express")();
const adminControl = require('../controllers/adminControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')
const multer = require('multer')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        console.log("file multer")
        if (!file.originalname.match(/\.(jpeg|png|jpg)$/))
            return cb(new Error('Please Upload an Image'))
        cb(undefined, true)
    }
})

// TEST ROUTE
router.post('/', upload.single('instituteImage'), (req, res) => {
    req.body.instituteImage = req.file.buffer
    console.log(req.body)
    console.log(req.file)
    res.send({
        statusCode: 200,
        payload: {
            msg: "The admin routes is healthy and running"
        },
    }).status(200)
})


// Create New Admin
router.post('/register', upload.single('instituteImage'), hashPassword, (req, res) => {
    console.log(chalk.yellow.bold("\nRegister Admin route hit..."))
    adminControl.register(req)
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

//#######################YET TO DO########################
// Update Admin
router.post('/update', (req, res) => {
    adminControl.update(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// View all Employees
router.post('/viewAllEmployees', (req, res) => {
    console.log(chalk.bold.yellow("\nView All Employees route hit..."))
    adminControl.viewAllEmployees(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

// Approve an Employee
router.post('/approveEmployee', (req, res) => {
    adminControl.approveEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// reject an Employee
router.post('/rejectEmployee', (req, res) => {
    adminControl.rejectEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// View all institutes
router.get('/institutes', (req, res) => {
    console.log(chalk.bold.yellow("\nFetch All Institutes route hit..."))
    adminControl.getInstitutes()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


module.exports = router;