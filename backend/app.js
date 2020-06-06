const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
var cors = require('cors');
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api', (req, res) => {
    res.send({
        statusCode: 200,
        payload: {
            msg: "The Backend is healthy and running",
            ci: "CI Test successfull"
        },
    }).status(200)
})

//Route imports
const adminRoute = require('./routes/admin')
const customerRoute = require('./routes/customer')
const employeeRoute = require('./routes/employee')


//Use Routes
app.use('/api/admin', adminRoute);
app.use('/api/customer', customerRoute);
app.use('/api/employee', employeeRoute);

const port = process.env.PORT
app.listen(port, () => {
    console.log('Server is up on port ', port)
})