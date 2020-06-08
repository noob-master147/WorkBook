const router = require("express")();
const employeeControl = require('../controllers/employeeControl')

//route to create for a user
router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The employee routes is healthy and running"
        },
    }).status(200)
})


router.post('/create', (req, res) => {
    employeeControl.create(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})



module.exports = router;