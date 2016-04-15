module.exports = function (db, mongoose) {

    "use strict";

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('User', UserSchema);


    var api = {
    };

    return api;

};