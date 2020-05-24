const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const coffee_router = require('./router/coffee_router');
app.use(coffee_router);

app.use(express.static("uploads"));

module.exports = app;