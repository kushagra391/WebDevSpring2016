module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        name: String,
        username: String,
        password: String
    }, {collection: 'user'}); // TODO: can be renamed with OOP styling

    return UserSchema;

};