const router = require("express")();
const adminControl = require('../controllers/adminControl')

//route to create for a user
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

module.exports = router;