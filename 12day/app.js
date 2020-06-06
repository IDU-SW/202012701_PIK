const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view')

const Coffee_router = require('./router/Coffee_router');
app.use(Coffee_router);

module.exports = app;

