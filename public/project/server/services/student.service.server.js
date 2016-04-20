module.exports = function (app, studentModel, developerModel, courseModel) {

    "use strict";

    app.get("/api/coursera/student/loggedin", loggedIn);
    app.post("/api/coursera/student/logout", logout);
    app.post("/api/coursera/student/update", updateSession);


    app.get("/api/coursera/student/all", findAllStudents);                                          // OK
    app.get("/api/coursera/student/:id", findStudentById);                                          // OK
    app.post("/api/coursera/student", createStudent);                                               // OK

    app.post("/api/coursera/student/login", findUserByCredentials);                                 // OK

    app.put("/api/coursera/student/:studentId/course/:courseId", addCourseToStudent);               // OK
    app.delete("/api/coursera/student/:studentId/course/:courseId", removeCourseFromStudent);       // OK

    app.delete("/api/coursera/student/:studentId", deleteStudentById);                              // OK

    function loggedIn(req, res) {
        res.json(req.session.currentStudent);
    }

    function logout(req, res) {
        console.log("Session Destroyed !");
        req.session.destroy();
        res.send(200);
    }

    function updateSession(req, res) {
        var newUser = req.data;
        req.session.currentStudent = newUser;

        console.log("User Session Updated");
    }

    function createStudent(req, res) {
        console.log(">> createStudent");

        var newStudent = req.body;
        console.log(JSON.stringify(newStudent));
        studentModel
            .createStudent(newStudent)
            .then(success, failure);

        function success(user) {
            // req.session.destroy();
            req.session.currentStudent = user;
            req.session.save();
            res.json(user)
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
                function (user) {
                    req.session.currentStudent = user;
                    req.session.save();
                    console.log("Storing to session " + req.session.currentStudent);
                    res.json(user);
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
        var newCourseId = req.params.courseId;

        console.log("studentId: " + studentId);
        console.log("newCourseId: " + newCourseId);

        studentModel
            .findStudentById(studentId)
            .then(
                function (student) {
                    studentModel
                        .addCourseToStudent(student, newCourseId)
                        .then(
                            function (student) {
                                res.json(student);
                            },
                            function (err) {
                                res.json(err);
                            }
                        );
                },
                function (err) {
                    res.json(err);
                }
            );

    }

    // TODO: fix needed
    function removeCourseFromStudent(req, res) {
        console.log(">> removeCourseFromStudent");

        var studentId = req.params.studentId;
        var courseId = req.params.courseId;

        studentModel
            .findStudentById(studentId)
            .then(
                function (student) {

                    studentModel
                        .removeCourseFromStudent(student, courseId)
                        .then(
                            function (doc) {
                                res.json(student);
                            },
                            function (err) {
                                res.json(err);
                            }
                        );
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function deleteStudentById(req, res) {

        var studentId = req.params.studentId;

        studentModel
            .deleteStudentById(studentId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

};


