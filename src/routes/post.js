const router = require("express")();
const postControl = require('../controllers/postControl')
const chalk = require('chalk')




/** 
 * @api {post} /create Create Post
 * @apiName Create Post
 * @apiGroup Post
 * 
 * @apiParam {String} createdBy
 * @apiParam {String} content
 * @apiParam {String} mediaUrl
 * 
 */ // Create Post
router.get('/create', (req, res) => {
    console.log(chalk.bold.yellow("Create Post Route Hit!"))
    postControl.create(req.params)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /delete Delete Post
 * @apiName Delete Post
 * @apiGroup Post
 * 
 * @apiParam @apiParam {String} id _id document id
 * 
 */ // Delete Post
router.get('/delete', (req, res) => {
    console.log(chalk.bold.yellow("Delete Post Route Hit!"))
    postControl.delete(req.params)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** 
 * @api {post} /enable Enable Post
 * @apiName Enable Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * 
 */ // Enable Post
router.get('/enable', (req, res) => {
    console.log(chalk.bold.yellow("Enable Post Route Hit!"))
    postControl.enable(req.params)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /disable Disable Post
 * @apiName Disable Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * 
 */ // Disable Post
router.get('/disable', (req, res) => {
    console.log(chalk.bold.yellow("Disable Post Route Hit!"))
    postControl.disable(req.params)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




module.exports = router;