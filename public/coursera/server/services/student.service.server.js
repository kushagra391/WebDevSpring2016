module.exports = function (app, studentModel, developerModel) {

    "use strict";

    app.get("/api/coursera/student/all", findAllStudents);                                          // OK
    app.get("/api/coursera/student/:id", findStudentById);                                          // OK
    app.post("/api/coursera/student", createStudent);                                               // OK

    app.post("/api/coursera/student/login", findUserByCredentials);                                 // OK

    app.post("/api/coursera/student/:studentId/course", addCourseToStudent);
    app.delete("/api/coursera/student/:studentId/course/:courseId", removeCourseToStudent);

    function createStudent(req, res) {
        console.log(">> createStudent");

        var newStudent = req.body;
        console.log(JSON.stringify(newStudent));
        studentModel
            .createStudent(newStudent)
            .then(success, failure);

        function success(doc) {
            res.json(doc)
        }

        function failure(err) {
            res.json(err);
        }
    }

    function findAllStudents(req, res) {
        studentModel
            .findAllStudents()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        console.log(">> findUserByCredentials");

        var credentials = req.body;
        studentModel
            .findUserByCredentials(credentials)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );

    }

    function findStudentById(req, res) {
        console.log(">> findUserById");

        var userid = req.params.id;
        studentModel
            .findStudentById(userid)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }
    
    // TODO: fix needed
    function addCourseToStudent(req, res) {
        console.log(">> addCourseToStudent");

        var studentId = req.params.studentId;
        var newCourse = req.body;

        studentModel
            .addCourseToStudent(studentId, newCourse)
            .then(
                function (student) {
                    res.json(student);
                },
                function (err) {
                    res.json(err);
                }
            );

    }

    // TODO: fix needed
    function removeCourseToStudent(req, res) {
        console.log(">> removeCourseToStudent");

        var studentId = req.params.studentId;
        var newCourse = req.params.courseId;

    }

};


