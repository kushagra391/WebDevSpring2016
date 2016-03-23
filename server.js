var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

<<<<<<< HEAD
require('./public/assignment/server/app.js')(app, db);

console.log('listening @' + port);
=======
app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/api/json', function (req, res) {

    var course = [
        {title: 'Java 101', seats: 12, start: new Date()},
        {title: 'C# 101', seats: 12, start: new Date()},
        {title: 'ASP.NET 101', seats: 12, start: new Date()},
        {title: 'Node.js 101', seats: 12, start: new Date()},
        {title: 'AngularJS 101', seats: 12, start: new Date()}
    ];
    res.json(course);

});

require("./public/experiments/examples/server-side/hello/app.js")(app);

>>>>>>> parent of 4905c36... fixed login issue
app.listen(port, ipaddress);

// var express = require('express');
// var app = express();
//
// var bodyParser = require('body-parser');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.use(express.static(__dirname + '/public'));
//
// var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
// var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//
// require("./public/assignment/server/app.js")(app);
//
// //require("./public/assignment/server/services/user.service.js")(app);
// //require("./public/assignment/server/services/form.service.js")(app);
//
// app.listen(port, ipaddress);
