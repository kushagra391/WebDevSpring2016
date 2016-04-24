module.exports = function (mongoose) {
    
    
    // TODO: define video schema, pull it out
    var CourseSchema = mongoose.Schema({
        name: String,
        description: String,
        courseType: String,
        likes: Number,
        videos: [{
            title: String,
            description: String,
            imgUrl: String,
            youtubeId: String
        }]
    },  {collection : 'course'});
    
    return CourseSchema;
};