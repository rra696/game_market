const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./Routes/authRouter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRouter);

app.use(function (req, res, next) {
    res.status(404).send('Not found');
});

app.listen(3000, function() {
    console.log('Server start on port: 80');
});