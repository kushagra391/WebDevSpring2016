module.exports = function (app) {
    // console.log('From demo server');
    
    var usertestService = require('./services/user.service.server.js')(app);

};