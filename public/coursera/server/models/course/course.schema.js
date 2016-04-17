module.exports = function (mongoose) {

    var CourseSchema = mongoose.Schema({
        name: String,
        description: String,
        likes: Number,
        videos: {
            title: String,
            description: String,
            imgUrl: String,
            youtubeId: String
        }
    },  {collection : 'course'});
    
    return CourseSchema;
};