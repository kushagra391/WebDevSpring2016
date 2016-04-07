module.exports = function (app, db, mongoose) {

    console.log('Starting A3 Server...');
    var userModel = require('./models/user.model.js')(db, mongoose);
    var formModel = require('./models/form.model.js')(db, mongoose);
    var fieldModel = require('./models/field.model.server')(db, mongoose, formModel);

    var userService = require('./services/user.service.server')(app, userModel);
    var formService = require('./services/form.service.js')(app, formModel, fieldModel);
    var fieldService = require('./services/field.service.server.js')(app, formModel, fieldModel);
};