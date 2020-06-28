const router = require("express")();
const postControl = require('../controllers/postControl')
const chalk = require('chalk')




/** 
 * @api {post} /post/create Create Post
 * @apiName Create Post
 * @apiGroup Post
 * 
 * @apiParam {String} createdBy User Name
 * @apiParam {String} content content of the Post
 * @apiParam {String} mediaUrl URL of the attached media
 * 
 */ // Create Post
router.post('/createPost', (req, res) => {
    console.log(chalk.bold.yellow("Create Post Route Hit!"))
    postControl.createPost(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /post/delete Delete Post
 * @apiName Delete Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * 
 */ // Delete Post
router.post('/deletePost', (req, res) => {
    console.log(chalk.bold.yellow("Delete Post Route Hit!"))
    postControl.deletePost(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})




/** 
 * @api {post} /post/enablePost Enable Post
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
 * @api {post} /post/disablePost Disable Post
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
 * @api {post} /post/updatePost Update Post
 * @apiName Update Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * @apiParam {String} content content of the Post
 * @apiParam {String} mediaUrl URL of the attached media
 * 
 */ // Update Post
router.post('/updatePost', (req, res) => {
    console.log(chalk.bold.yellow("Update Post Route Hit!"))
    postControl.updatePost(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {get} /post/viewAllPost View All Post
 * @apiName View All Post
 * @apiGroup Post
 *
 */ // viewAllPost Post
router.get('/viewAllPost', (req, res) => {
    console.log(chalk.bold.yellow("View All Post Route Hit!"))
    postControl.viewAllPost()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /post/like Like Post
 * @apiName Like Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * @apiParam {String} userName User Name
 *
 */ // 
router.post('/like', (req, res) => {
    console.log(chalk.bold.yellow("Like Post Route Hit!"))
    postControl.like(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /post/comment Comment on Post
 * @apiName Comment Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * @apiParam {String} content
 * @apiParam {String} mediaUrl
 * 
 */ // Comment Post
router.post('/comment', (req, res) => {
    console.log(chalk.bold.yellow("Comment Post Route Hit!"))
    postControl.comment(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})





/** 
 * @api {post} /post/updateViews Add Views on Post
 * @apiName Add Views on Post
 * @apiGroup Post
 * 
 * @apiParam {String} id _id document id
 * 
 */ // Comment Post
router.post('/updateViews', (req, res) => {
    console.log(chalk.bold.yellow("Add Views on Post Route Hit!"))
    postControl.updateViews(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})






/** 
 * @api {delete} /post/delete Delete All Post
 * @apiName Delete All Post
 * @apiGroup Post
 * 
 * 
 */ // Comment Post
router.delete('/delete', (req, res) => {
    console.log(chalk.bold.yellow("Delete Post Route Hit!"))
    postControl.deleteAllPost()
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})






module.exports = router;