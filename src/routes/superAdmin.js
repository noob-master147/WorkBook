const router = require("express")();
const superAdminControl = require('../controllers/superAdminControl')
const { hashPassword } = require('../middleware/hashPassword')
const chalk = require('chalk')

// TEST ROUTE
router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The Super Admin routes is healthy and running",
            routes: {

            }

        },
    }).status(200)
})


// Approve an Admin
router.post('/approveAdmin', (req, res) => {
    superAdminControl.approveAdmin(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


// Purge DataBase
router.delete('/purge', (req, res) => {
    superAdminControl.purge()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



module.exports = router;