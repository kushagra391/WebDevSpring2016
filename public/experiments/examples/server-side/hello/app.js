var express = require('express');
var cors = require('cors');

var app = express();

function sayHello(req, res) {
    res.send('<h2>Say Hello</h2>');
}

app.get('/api/hello', sayHello);
app.get('/api/json', function (req, res) {

    var course = [
        {title: 'Java 101', seats: 12, start: new Date()},
        {title: 'C# 101', seats: 12, start: new Date()},
        {title: 'ASP.NET 101', seats: 12, start: new Date()},
        {title: 'Node.js 101', seats: 12, start: new Date()},
        {title: 'AngularJS 101', seats: 12, start: new Date()}
    ];
    res.send(course);

});

// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000);
console.log("Server running@: http://localhost:3000/");

