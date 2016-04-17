module.exports = function (db, mongoose) {

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
        removeCourseToStudent: removeCourseToStudent
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

        return StudentModel.find({username: username, password: password});
    }

    function findStudentById(userId) {
        return StudentModel.findById(userId);
    }

    function addCourseToStudent(studentId, newCourse) {


    }

    function removeCourseToStudent() {

    }

};