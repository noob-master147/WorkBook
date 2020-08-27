const router = require("express")();
const taskControl = require('../controllers/taskControl')
const chalk = require('chalk')
const { authenticate } = require('../middleware/authenticate')

/** 
 * @api {post} /task/adminCreate Admin Create Task
 * @apiName Admin Create Task
 * @apiGroup Task
 * 
 * @apiParam {String} usedID User Id of Admin
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} instituteName Institute Name
 * @apiParam {String} type Type of Task
 * @apiParam {String} description Description of the Task
 * 
 */ //Create Task
router.post('/adminCreate', (req, res) => {
    console.log(chalk.bold.yellow("\n/task/adminCreate Route Hit!"))
    taskControl.adminCreate(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})


/** 
 * @api {post} /task/employeeCreate Employee Create Task
 * @apiName Employee Create Task
 * @apiGroup Task
 * 
 * @apiParam {String} usedID User Id of Employee
 * @apiParam {String} jwtToken JWT Token of the User
 * @apiParam {String} instituteName Institute Name 
 * @apiParam {String} type Type of Task
 * @apiParam {String} description Description of the Task
 * @apiParam {String} grade Grade
 * @apiParam {String} Division Division
 * 
 */ // Create Task
router.post('/employeeCreate', (req, res) => {
    console.log(chalk.bold.yellow("\n/task/employeeCreate Route Hit!"))
    taskControl.employeeCreate(req.body)
        .then((obj) => res.send(obj).status(200))
        .catch((err) => res.send(err).status(400))
})



module.exports = router;