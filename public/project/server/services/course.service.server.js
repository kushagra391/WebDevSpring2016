module.exports = function (app, studentModel, developerModel, courseModel) {

    "use strict";
    app.get("/api/coursera/course/all", findAllCourses);                                        // OK
    app.get("/api/coursera/course/:courseId", findCourseById);                                  // OK
    app.get("/api/coursera/student/:studentId/course/all", findAllCoursesByStudentId);          // OK 
    app.get("/api/coursera/developer/:developerId/course/all", findAllCoursesByDevloperId);
    app.get("/api/coursera/course/search/:searchString", searchCourseByQueryString);            // OK ?

    app.post("/api/coursera/course/:courseId", addVideoToCourse);                               // OK

    app.delete("/api/coursera/course/:courseId/content/:contentId", deleteVideoByIdFromCourse); // OK
    app.delete("/api/coursera/course/:courseId", deleteCourseById);
    app.delete("/api/coursera/course", deleteAllCourses);

    function deleteAllCourses(req, res) {

        console.log("Deleting all courses");

        courseModel
            .deleteAllCourses()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findAllCourses(req, res) {
        console.log(">> findAllCourses");

        courseModel
            .findAllCourses()
            .then(
                function (courses) {
                    res.json(courses);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findCourseById(req, res) {
        console.log(">> findCourseById");

        var courseId = req.params.courseId;

        courseModel
            .findCourseById(courseId)
            .then(
                function (course) {
                    res.json(course);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findAllCoursesByStudentId(req, res) {

        var studentId = req.params.studentId;

        studentModel
            .findStudentById(studentId)
            .then(
                function (student) {
                    var studentCourseIds = student.courses_registerd;
                    console.log(studentCourseIds);
                    courseModel
                        .findAllCoursesByIDs(studentCourseIds)
                        .then(
                            function (courses) {
                                res.json(courses);
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

    function findAllCoursesByDevloperId(req, res) {
        
        var developerId = req.params.developerId;
        
        developerModel
            .findDeveloperById(developerId)
            .then(
                function (developer) {
                    var developerCoueseIds = developer.courses_created;
                    console.log(developerCoueseIds);
                    
                    courseModel
                        .findAllCoursesByIDs(developerCoueseIds)
                        .then(
                            function (courses) {
                                res.json(courses);
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
    
    
    function searchCourseByQueryString(req, res) {
        console.log(">> searchCourseByQueryString");

        var searchKey = req.params.searchString;
        console.log("SearchKey: " + searchKey);

        var results = [];
        courseModel
            .findAllCourses()
            .then(
                function (courses) {
                    console.log("All courses found !");
                    // console.log(JSON.stringify(courses));

                    for (var i in courses) {
                        console.log("searching in name >> " + i + " ID: " + courses[i]._id);
                        var course = courses[i];

                        var text1 = course.name;
                        console.log(text1.toLowerCase());
                        if (text1.toLowerCase().indexOf(searchKey.toLowerCase()) != -1) {
                            console.log("Match found: name");
                            results.push(course);
                        }
                    }

                    /*
                    for (var i in courses) {
                        console.log("searching in description >> " + i);
                        var course = courses[i];

                        var text2 = course.description;

                        if (
                            text2.toLowerCase().indexOf(searchKey.toLowerCase()) != -1) {
                            console.log("Match found: description");
                            results.push(course);
                        }
                    }
                     */

                    for (var i in courses) {
                        console.log("searching in types >> " + i);
                        var course = courses[i];

                        var text2 = course.courseType;

                        if (
                            text2.toLowerCase().indexOf(searchKey.toLowerCase()) != -1) {
                            console.log("Match found: description");
                            results.push(course);
                        }
                    }


                    res.json(results);
                },
                function (err) {
                    res.json(err);
                }
            )

    }

    function addVideoToCourse(req, res) {
        console.log(">> addVideoToCourse");

        var courseId = req.params.courseId;
        var newVideo = req.body;

        courseModel
            .findCourseById(courseId)
            .then(
                function (course) {
                    courseModel
                        .addVideoToCourse(course, newVideo)
                        .then(
                            function (course) {
                                res.json(course);
                            },
                            function (err) {
                                res.json(err);
                            }
                        )
                },
                function (err) {
                    res.json(err);
                }
            )
    }

    function deleteVideoByIdFromCourse(req, res) {

        var courseId = req.params.courseId;
        var contentId = req.params.contentId;

        courseModel
            .findCourseById(courseId)
            .then(
                function (course) {
                    courseModel
                        .removeVideoFromCourse(course, contentId)
                        .then(
                            function (course) {
                                res.json(course);
                            },
                            function (err) {
                                res.json(err);
                            }
                        )
                },
                function (err) {
                    res.json(err);
                }
            )

    }

    function deleteCourseById(req, res) {
        var courseId = req.params.courseId;

        courseModel
            .findCourseById(courseId)
            .then(
                function (course) {
                    courseModel
                        .deleteCourse(course)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.json(err);
                            }
                        )
                },
                function (err) {
                    res.json(err);
                }
            );
    }

};