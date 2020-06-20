const chalk = require('chalk');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

var cors = require('cors');
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/apidoc', express.static('apidoc'));

//Route imports
const admin = require('./routes/admin');
const customer = require('./routes/customer');
const employee = require('./routes/employee');
const superAdmin = require('./routes/superAdmin')
const common = require('./routes/common')
app.use('/admin', admin)
app.use('/employee', employee)
app.use('/customer', customer)
app.use('/superAdmin', superAdmin)
app.use('/', common)

//Load the Landing page for the form
app.get('/', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The API is healthy and running",
            Routes: {
                admin: "/admin",
                employee: "/employee",
                customer: "/customer"
            }

        },
    }).status(200)
})

// Connect to Database
mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => {
        console.log(chalk.green.bold('Connected to MongoDB'))
    })


module.exports = app