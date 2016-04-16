

module.exports = function (app, db, mongoose) {
    var userModel = require('./models/user/user.model.server.js')(db, mongoose);
    var userService = require('./services/user.service.server')(app, userModel);
    var courseService = require('./services/courses.service.server')(app, userModel);
};