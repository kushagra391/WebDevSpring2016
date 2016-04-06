var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/testdb';
var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require('./public/assignment/server/app.js')(app, db, mongoose);

// require('./public/experiments/examples/serverDemo/app.js')(app);
require('./public/experiments/examples/mongoDemo/server/app.js')(app, db, mongoose);


console.log('Listening at port: ' + port);
app.listen(port, ipaddress);
