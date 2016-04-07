module.exports = function (app, db, mongoose) {

    console.log('Starting A3 Server...');
    var userModel = require('./models/user.model.js')(db, mongoose);
    var formModel = require('./models/form.model.js')(db, mongoose);

    var userService = require('./services/user.service.server')(app, userModel);
    var formService = require('./services/form.service.js')(app, formModel);
    var fieldService = require('./services/field.service.server.js')(app, formModel);
};