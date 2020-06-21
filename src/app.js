const chalk = require('chalk')
const app = require('./index')

const port = process.env.PORT
app.listen(port, () => {
    console.log(chalk.yellow.bold('\nServer is up on port ', port))
})