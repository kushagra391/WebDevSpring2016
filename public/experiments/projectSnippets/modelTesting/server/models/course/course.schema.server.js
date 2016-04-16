module.exports = function (mongoose) {

    var CourseSchema = mongoose.Schema({
        name: String,
        description: String
    }, {collection: 'course'});

    return CourseSchema;
};  