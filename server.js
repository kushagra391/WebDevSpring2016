var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

// Mongoose + db
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/testdb';
//Openshift mongoDB
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer
app.use(multer());

// Server listen + ip address set
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// Linkages to other .js files
require('./public/assignment/server/app.js')(app, db, mongoose);
// require('./public/experiments/examples/serverDemo/app.js')(app);
require('./public/experiments/examples/mongoDemo/server/app.js')(app, db, mongoose);

// Start server
console.log('Listening at port: ' + port);
app.listen(port, ipaddress);
