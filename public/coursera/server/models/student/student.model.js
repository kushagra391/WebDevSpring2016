module.exports = function (mongoose) {

    "use strict";

    var StudentSchema = require('./student.schema.server')(mongoose);
    console.log("StudentSchema: " + StudentSchema);
    var StudentModel = mongoose.model('Student', StudentSchema);

    var api = {

        createStudent: createStudent,
        findAllStudents: findAllStudents,

        findUserByCredentials: findUserByCredentials,
        findStudentById: findStudentById,

        addCourseToStudent: addCourseToStudent,
        removeCourseFromStudent: removeCourseFromStudent,

        deleteStudentById: deleteStudentById
    };
    return api;

    function createStudent(newUser) {
        return StudentModel.create(newUser);
    }

    function findAllStudents() {
        return StudentModel.find();
    }

    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;

        return StudentModel.findOne({username: username, password: password});
    }

    function findStudentById(userId) {
        return StudentModel.findById(userId);
    }

    function addCourseToStudent(student, newCourseId) {

        var courses = student.courses_registerd;

        console.log("student:" + JSON.stringify(student));
        console.log("courses:" + JSON.stringify(courses));
        console.log("newCourseId: " + newCourseId);

        // courses.push(mongoose.Types.ObjectId(newCourseId));
        courses.push(newCourseId);

        return student.save();
    }

    function deleteStudentById(studentId) {

        var student = StudentModel.findById(studentId);

        return student.remove();
    }

    function removeCourseFromStudent(student, courseId) {

        var courses = student.courses_registerd;

        for (var i in courses) {

            var course = course[i];

            if (course._id == courseId) {
                courses.splice(i, 1);
            }
        }

        return student.save();
    }

};