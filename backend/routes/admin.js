const router = require("express")();
const adminControl = require('../controllers/adminControl')

// TEST ROUTE
router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The admin routes is healthy and running"

        },
    }).status(200)
})


// Create New Admin
router.post('/create', (req, res) => {
    adminControl.createAdmin(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})

// Update Admin
router.post('/update', (req, res) => {
    adminControl.update(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

// View all Employee
router.post('/viewEmployee', (req, res) => {
    adminControl.viewEmployee()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})

// Approve an Employee
router.post('/approveEmployee', (req, res) => {
    adminControl.approveEmployee(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



module.exports = router;