const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const coffeeRouter = require('./router/coffee_router');
app.use(coffeeRouter);

module.exports = app;