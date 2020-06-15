const chalk = require('chalk')
const router = require("express")();
const customerControl = require('../controllers/customerControl')
const { hashPassword } = require('../middleware/hashPassword')

router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The customer routes is healthy and running"
        },
    }).status(200)
})

// Register a Customer
router.post('/register', hashPassword, (req, res) => {
    customerControl.register(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})


// Update Customer
router.post('/update', (req, res) => {
    customerControl.updateCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// route to Login Customer
router.post('/login', (req, res) => {
    console.log(chalk.bold.yellow("\nLogin Customer route hit..."))
    customerControl.login(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


module.exports = router;