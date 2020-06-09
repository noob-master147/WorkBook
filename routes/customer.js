const router = require("express")();
const customerControl = require('../controllers/customerControl')

router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The customer routes is healthy and running"
        },
    }).status(200)
})

// Create a Customer
router.post('/create', (req, res) => {
    customerControl.createCustomer(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})


// Update Customer
router.post('/update', (req, res) => {
    customerControl.updateCustomer(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// // View Particular Customer
// router.post('/viewCustomer', (req, res) => {
//     customerControl.viewCustomer(req.body)
//         .then((obj) => res.send(obj).status(200))
//         .catch((err) => res.send(err).status(400))
// })

// // View all Customer
// router.post('/viewAllCustomers', (req, res) => {
//     customerControl.viewAllCustomers()
//         .then((obj) => res.send(obj).status(200))
//         .catch((err) => res.send(err).status(400))
// })

// // Approve an Customer
// router.post('/approveCustomer', (req, res) => {
//     customerControl.approveCustomer(req.body)
//         .then((obj) => res.send(obj).status(200))
//         .catch((err) => res.send(err).status(400))
// })


module.exports = router;