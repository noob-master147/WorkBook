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


/** Register Customer
 * @api {post} /customer/register Customer Register
 * @apiName Register
 * @apiGroup Customer
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} userID Email ID
 * @apiParam {String} password Password
 * @apiParam {String} instituteName Name of The Institute
 * @apiParam {String} grade Grade
 * @apiParam {String} division Division
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 *
 */ // Register Customer
router.post('/register', hashPassword, (req, res) => {
    customerControl.register(req.body)
        .then((obj) => res.send(obj).status(201))
        .catch((err) => res.send(err).status(400))
})



/** Update Customer
 * @api {post} /customer/register Update Customer
 * @apiName Register
 * @apiGroup Customer
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} grade Grade
 * @apiParam {String} state State
 * @apiParam {String} city City
 * @apiParam {String} division Division
 * @apiParam {Number} adharNumber Adhar Number
 * @apiParam {Number} contactNumber Contact Number
 * @apiParam {String} fcmToken FCM Device Token
 * 
 */ // Update Customer
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