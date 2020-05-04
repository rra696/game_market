const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./Routes/authRouter');
const db = require('./config/db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", authRouter);

app.use(function (req, res, next) {
    res.status(404).send('Not found');
});

db.connection.sync().then(
    app.listen(3000, function () {
        console.log('Server start on port: 80');
    })
);


