const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
const chalk = require('chalk');
const dotenv = require("dotenv");
dotenv.config();
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route imports
const admin = require('./routes/admin');
const customer = require('./routes/customer');
const employee = require('./routes/employee');
app.use('/admin', admin)
app.use('/employee', employee)
app.use('/customer', customer)

//Load the Landing page for the form
app.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The API is healthy and running"

        },
    }).status(200)
})

// Connect to Database
mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log(chalk.green.bold('Connected to MongoDB'))
    })

//Listen to Server
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(chalk.bold.yellow.bgBlack('\nServer is up on port ', port))
})