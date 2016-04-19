var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var cookieParser = require('cookie-parser');
var session = require('express-session');

// Mongoose + db
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/courseraDB';
//Openshift mongoDB
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Multer
app.use(multer());

// Session / Cookies
app.use(session({
    secret: "secrettext"

}));
app.use(cookieParser());

// app.use(session({
//     secret: "secrettext",
//     saveUninitialized: true,
//     resave: true
// }));

// Server listen + ip address set
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// Linkages to other .js files
// require('./public/assignment/server/app.js')(app, db, mongoose);
// require('./public/experiments/examples/serverDemo/app.js')(app);
// require('./public/experiments/examples/mongoDemo/server/app.js')(app, db, mongoose);

// require('./public/experiments/projectSnippets/modelTesting/server/app')(app, db, mongoose);         // modelTesting

// require('./public/coursera/server/app')(app, db, mongoose);         // modelTesting
require('./public/project/server/app')(app, db, mongoose);         // modelTesting

app.get("/", function (req, res) {
    res.json("Hello !");
});

// Start server
console.log('Listening at port: ' + port);
app.listen(port, ipaddress);
