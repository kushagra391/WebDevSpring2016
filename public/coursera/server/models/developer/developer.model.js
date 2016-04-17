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

    function addCourseForDeveloper(developer, newCourseId) {
        console.log("addCourseForDeveloper");
        var courses = developer.courses_created;
        console.log("developer: " + JSON.stringify(developer));
        console.log("courses: " + courses);
        console.log("newCourseId: " + newCourseId);

        // courses.push(newCourse);
        courses.push(mongoose.Types.ObjectId(newCourseId));

        console.log("returning...");
        return developer.save();
    }

    function removeCourseForDeveloper(developer, courseId) {
        console.log("CourseID: " + courseId);
        // console.log("Developer: "+ developer);

        var courses = developer.courses_created;
        console.log(">> courses: " + JSON.stringify(courses));
        for (var i in courses) {
            var course = courses[i];
            console.log(i + "--> " + course);

            if (course == courseId) {
                console.log("++ Course Spliced: " + course._id);
                courses.splice(i, 1);
            }
        }

        return developer.save();
    }

};