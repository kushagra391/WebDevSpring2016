module.exports = function (mongoose) {

    var FollowSchema = mongoose.Schema({

        studentId: String,
        developerId: String

    }, {collection: 'follow'});

    return FollowSchema;
};