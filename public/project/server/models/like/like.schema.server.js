module.exports = function (mongoose) {

    var LikeSchema = mongoose.Schema({

        studentId: String,
        courseId: String

    }, {collection: 'like'});

    return LikeSchema;
};