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



/** Approve Admin
 * @api {post} /superAdmin/approveAdmin Approve Admin
 * @apiName Approve Admin
 * @apiGroup SuperAdmin
 *
 * @apiParam {String} id _id of the Admin Document
 *
 */ // Approve Admin
router.post('/approveAdmin', (req, res) => {
    console.log(chalk.yellow.bold('Approve Admin Route Hit'))
    superAdminControl.approveAdmin(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Reject Admin
 * @api {post} /superAdmin/rejectAdmin Reject Admin
 * @apiName Reject Admin
 * @apiGroup SuperAdmin
 *
 * @apiParam {String} id _id of the Admin Document
 *
 */ // Reject Admin
router.post('/rejectAdmin', (req, res) => {
    console.log(chalk.yellow.bold('Reject Admin Route Hit'))
    superAdminControl.rejectAdmin(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** Purge DataBase
 * @api {delete} /superAdmin/purge Purge Database
 * @apiName Purge Database
 * @apiGroup SuperAdmin
 *
 */ // Purge DataBase
router.delete('/purge', (req, res) => {
    console.log(chalk.yellow.bold('Purge DB Route Hit'))
    superAdminControl.purge()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/**
 * @api {delete} /superAdmin/deleteAdmin Delete Admin
 * @apiName Delete Admin
 * @apiGroup SuperAdmin
 *
 * @apiParam {String} id _id of the Admin Document
 *
 */ // Delete Admin
router.delete('/deleteAdmin', (req, res) => {
    console.log(chalk.yellow.bold('Delete Admin Route Hit'))
    superAdminControl.deleteAdmin(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



/** View All Admin
 * @api {get} /superAdmin/viewAllAdmin View All Admin
 * @apiName View All Admin
 * @apiGroup SuperAdmin
 *
 */ // View All Admin
router.get('/viewAllAdmin', (req, res) => {
    console.log(chalk.yellow.bold('View All Admin Route Hit'))
    superAdminControl.viewAllAdmin(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** Create Super Admin
 * @api {post} /superAdmin/viewAllAdmin Create SuperAdmin
 * @apiName Create SuperAdmin
 * @apiGroup SuperAdmin
 *
 * @apiParam {String} userID Email SuperAdmin
 * @apiParam {String} fcmToken FCM Token
 * @apiParam {String} password Password
 * @apiParam {String} userName Name of SuperAdmin
 */ // View All Admin
router.post('/create', hashPassword, (req, res) => {
    console.log(chalk.yellow.bold('Create SuperAdmin Route Hit'))
    superAdminControl.create(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})






module.exports = router;