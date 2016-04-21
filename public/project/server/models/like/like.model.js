module.exports = function (mongoose) {

    "use strict";

    var LikeSchema = require('./like.schema.server')(mongoose);
    var LikeModel = mongoose.model('Like', LikeSchema);

    var api = {

        findLikeById: findLikeById,
        findAllLikes: findAllLikes,
        addLikeForStudentAndCourse: addLikeForStudentAndCourse,
        removeLikeForStudentAndCourse: removeLikeForStudentAndCourse,
        removeAllLikes : removeAllLikes,
        removeLikeById: removeLikeById,
        findLikesForCourseId: findLikesForCourseId

    };
    return api;

    function findLikeById(likeId) {
        return LikeModel.findById(likeId);
    }

    function findAllLikes() {
        return LikeModel.find();
    }

    function addLikeForStudentAndCourse(newLike) {
        return LikeModel.create(newLike);
    }

    function removeLikeForStudentAndCourse(courseId, studentId) {
        return LikeModel.remove({courseId: courseId}, {studentId: studentId});
    }

    function removeAllLikes() {
        return LikeModel.remove();
    }

    function removeLikeById(likeId) {
        var like = LikeModel.findById(likeId);

        return like.remove();
    }

    function findLikesForCourseId(courseId) {
        return LikeModel.find({courseId: courseId});
    }
};