var express = require('express');
var bodyParser = require('body-parser');
const path = require('path')

const SERVER_PORT = 8080;
var mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/spacebookDB',
function () {
  console.log("DB connection established!!!");
});

var app = express();
const api = require('./server/routes/api')
app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(express.static('models'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)
app.listen(process.env.PORT || SERVER_PORT);



