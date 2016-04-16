module.exports = function (mongoose) {
    
    var CourseSchema = require('../course/course.schema.server')(mongoose);

    var UserSchema = mongoose.Schema({
        name: String,
        username: String,
        password: String,
        courses: [CourseSchema]
    }, {collection: 'user'}); // TODO: can be renamed with OOP styling

    return UserSchema;

};