module.exports = function (app, likeModel) {

    "use strict";

    app.get("/api/coursera/like/all", findAllLikes);                                                    // OK
    app.get("/api/coursera/like/:likeId", findLikeById);                                                // OK
    app.get("/api/coursera/like/course/:courseId", findLikesForCourseId);                               // OK
    app.post("/api/coursera/like", addLikeForStudentAndCourse);                                         // OK
    app.delete("/api/coursera/like/all", removeAllLikes);                                           // OK
    app.delete("/api/coursera/like/:likeId", removeLikeById);                                           // OK
    app.delete("/api/coursera/like/course/:courseId/student/:studentId", removeLikeForStudentAndCourse);// OK

    function findLikeById(req, res) {
        var likeId = req.params.likeId;

        likeModel
            .findLikeById(likeId)
            .then(
                function (like) {
                    res.json(like);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findAllLikes(req, res) {

        likeModel
            .findAllLikes()
            .then(
                function (likes) {
                    res.json(likes);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findLikesForCourseId(req, res) {
        var courseId = req.params.courseId;

        likeModel
            .findLikesForCourseId(courseId)
            .then(
                function (likes) {
                    res.json(likes);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function addLikeForStudentAndCourse(req, res) {

        var newLike = req.body;
        
        likeModel
            .addLikeForStudentAndCourse(newLike)
            .then(
                function (like) {
                    res.json(like)
                },
                function (err) {
                    res.json(err);
                }
            );

    }

    function removeAllLikes(req, res) {

        likeModel
            .removeAllLikes()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function removeLikeById(req, res) {
        var likeId = req.params.likeId;
        
        likeModel
            .removeLikeById(likeId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }
    
    
    function removeLikeForStudentAndCourse(req, res) {
        var courseId = req.params.courseId;
        var studentId = req.params.studentId;

        likeModel
            .removeLikeForStudentAndCourse(courseId, studentId)
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