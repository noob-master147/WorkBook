const chalk = require('chalk')
const app = require('./index')

const port = process.env.PORT
app.listen(port, () => {
    console.log(chalk.yellow.bold('\nServer is up on port ', port))
})












req = {

    "instituteName": "IEEE",
    "division": [
        { "division": "1" },
        { "division": "2" },
        { "division": "3" },
        { "division": "4" },
        { "division": "5" },
    ],
    "grade": [
        { "grade": "chair" },
        { "grade": "V.chair" },
        { "grade": "TechHead" },
        { "grade": "SponHead" },
        { "grade": "TechLead" },
    ]



}