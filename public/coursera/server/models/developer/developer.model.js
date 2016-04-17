module.exports = function (mongoose) {

    "use strict";

    var DeveloperSchema = require('./developer.schema.server')(mongoose);
    var DeveloperModel = mongoose.model('Developer', DeveloperSchema);

    var api = {

        findDeveloperById : findDeveloperById,
        findAllDevelopers: findAllDevelopers,
        createDeveloper: createDeveloper,
        findUserByCredentials: findUserByCredentials,

        addCourseForDeveloper: addCourseForDeveloper,
        removeCourseForDeveloper : removeCourseForDeveloper

    };
    return api;

    function findDeveloperById(developerId) {
        return DeveloperModel.findById(developerId);
    }

    function findAllDevelopers() {
        return DeveloperModel.find();
    }

    function createDeveloper(newDeveloper) {
        return DeveloperModel.create(newDeveloper);
    }

    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;

        return DeveloperModel.find({username: username, password: password});
    }

    function addCourseForDeveloper(developer, newCourse) {
        var courses = developer.courses_created;

        courses.push(newCourse);
        return developer.save();
    }

    function removeCourseForDeveloper(developer, courseId) {
        console.log("CourseID: " + courseId);
        var courses = developer.courses_created;
        for (var i in courses) {
            var course = courses[i];

            if (course._id == courseId) {
                console.log("++ Course Spliced: " + course._id);
                courses.splice(i, 1);
            }
        }

        return developer.save();
    }

};