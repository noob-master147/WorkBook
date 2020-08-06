const chalk = require('chalk')
const router = require("express")();
const guestControl = require('../controllers/guestControl')
const { hashPassword } = require('../middleware/hashPassword')

router.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The guest routes is healthy and running"
        },
    }).status(200)
})


/** Create Query
 * @api {post} /guest/createQuery Create Query
 * @apiName Create Query
 * @apiGroup Guest
 *
 * @apiParam {String} userName User Name
 * @apiParam {String} userID Email ID
 * @apiParam {String} message Query
 * @apiParam {String} instituteName Name of the Institute
 * @apiParam {String} fcmToken FCM Device Token 
 * @apiParam {String} contactNumber Contact Number
 *
 */ // Create Query
router.post('/createQuery', (req, res) => {
    console.log(chalk.yellow.bold("\n/guest/createQuery Route Hit"))
    guestControl.createQuery(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Get All Query
 * @api {post} /guest/getAllQuery Get All Query
 * @apiName Get All Query
 * @apiGroup Guest
 * 
 * @apiParam {String} instituteName Name of the Institute
 *
 */ // Get All Query
router.post('/getAllQuery', (req, res) => {
    console.log(chalk.yellow.bold("\n/guest/getAllQuery Route Hit"))
    guestControl.getAllQuery(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** unregister
 * @api {post} /guest/unregister Unregister
 * @apiName Unregister
 * @apiGroup Guest
 * 
 * @apiParam {String} id _id of the Query Doc
 *
 */ // Unregister
router.post('/unregister', (req, res) => {
    console.log(chalk.yellow.bold("\n/guest/unregister Route Hit"))
    guestControl.unregister(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


module.exports = router;