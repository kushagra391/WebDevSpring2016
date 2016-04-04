var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require('./public/assignment/server/app.js')(app, db);

console.log('listening @' + port);
app.listen(port, ipaddress);