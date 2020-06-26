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
router.post('/createPost', (req, res) => {
    console.log(chalk.bold.yellow("Create Post Route Hit!"))
    postControl.createPost(req.body)
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
router.post('/deletePost', (req, res) => {
    console.log(chalk.bold.yellow("Delete Post Route Hit!"))
    postControl.deletePost(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** 
 * @api {post} /enablePost Enable Post
 * @apiName Enable Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * 
 */ // Enable Post
router.post('/enablePost', (req, res) => {
    console.log(chalk.bold.yellow("Enable Post Route Hit!"))
    postControl.enablePost(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /disablePost Disable Post
 * @apiName Disable Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * 
 */ // Disable Post
router.post('/disablePost', (req, res) => {
    console.log(chalk.bold.yellow("Disable Post Route Hit!"))
    postControl.disablePost(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /update Update Post
 * @apiName Update Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * @apiParam {String} content
 * @apiParam {String} mediaUrl
 * 
 */ // Update Post
router.post('/updatePost', (req, res) => {
    console.log(chalk.bold.yellow("Update Post Route Hit!"))
    postControl.updatePost(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




module.exports = router;