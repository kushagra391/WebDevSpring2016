var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require('./public/assignment/server/app.js')(app, db);
require('./public/test/server/app.js')(app, db);
// require('./public/experiments/examples/serverDemo/app.js')(app);

console.log('Listening at port: ' + port);
app.listen(port, ipaddress);
