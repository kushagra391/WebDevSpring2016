module.exports = function (mongoose) {

    var CourseSchema = require('../course/course.schema')(mongoose);

    var StudentSchema = mongoose.Schema({
        name: String,
        username: String,
        password: String,
        // courses_registerd: [{ type : mongoose.Types.ObjectId}]
        courses_registerd: [String]
    }, {collection: 'student'});

    return StudentSchema;
};

