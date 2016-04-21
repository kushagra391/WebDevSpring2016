module.exports = function (mongoose) {

    "use strict";

    var FollowSchema = require('./follow.schema.server')(mongoose);
    var FollowModel = mongoose.model('Follow', FollowSchema);

    var api = {
        findAllFollows: findAllFollows,
        findFollowById: findFollowById,
        findFollowersForDevloperId : findFollowersForDevloperId,
        addFollowForUserAndCourse: addFollowForUserAndCourse,
        removeFollowById: removeFollowById,
        removeFollowForUserAndCourse : removeFollowForUserAndCourse

    };
    return api;

    function findAllFollows() {
        return FollowModel.find();
    }

    function findFollowById(followId) {
        return FollowModel.findById(followId);
    }

    function findFollowersForDevloperId(developerId) {
        return FollowModel.find({developerId : developerId});
    }

    function addFollowForUserAndCourse(newFollow) {
        return FollowModel.create(newFollow);
    }

    function removeFollowById(followId) {
        var follow = FollowModel.findById(followId);
        return follow.remove();
    }

    function removeFollowForUserAndCourse(developerId, studentId) {
        var follow  = FollowModel.remove({developerId : developerId}, {studentId : studentId});
        return follow.remove();
    }

};