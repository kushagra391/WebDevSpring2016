module.exports = function (app, followModel) {

    "use strict";

    app.get("/api/coursera/follow/all", findAllFollows);                                                            // OK
    app.get("/api/coursera/follow/:followId", findFollowById);                                                      // OK
    app.get("/api/coursera/follow/developer/:developerId", findFollowersForDevloperId);                             // OK
    app.post("/api/coursera/follow", addFollowForUserAndCourse);                                                    // OK
    app.delete("/api/coursera/follow/:followId", removeFollowById);                                                 // OK
    app.delete("/api/coursera/follow/developer/:developerId/student/:studentId", removeFollowForUserAndCourse);     // OK

    function findAllFollows(req, res) {

        followModel
            .findAllFollows()
            .then(
                function (follows) {
                    res.json(follows);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findFollowById(req, res) {

        var followId = req.params.followId;

        followModel
            .findFollowById(followId)
            .then(
                function (follow) {
                    res.json(follow);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findFollowersForDevloperId(req, res) {

        var developerId = req.params.developerId;

        followModel
            .findFollowersForDevloperId(developerId)
            .then(
                function (follow) {
                    res.json(follow);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function addFollowForUserAndCourse(req, res) {

        var newFollow = req.body;

        followModel
            .addFollowForUserAndCourse(newFollow)
            .then(
                function (follow) {
                    res.json(follow);
                },
                function (err) {
                    res.json(err);
                }
            );

    }

    function removeFollowById(req, res) {

        var followId = req.params.followId;

        followModel
            .removeFollowById(followId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function removeFollowForUserAndCourse(req, res) {

        var studentId = req.params.studentId;
        var developerID = req.params.developerId;

        followModel
            .removeFollowForUserAndCourse(developerID, studentId)
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