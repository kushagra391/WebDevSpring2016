module.exports = function (mongoose) {

    var CourseSchema = require('../course/course.schema')(mongoose);

    var DeveloperSchema = mongoose.Schema({
        name: String,
        username: String,
        password: String,
        courses_created: [CourseSchema]
    }, {collection: 'developer'});

    return DeveloperSchema;
};