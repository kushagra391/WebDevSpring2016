module.exports = function (app, db, mongoose) {

    var studentModel = require('./models/student/student.model.js')(mongoose);
    var developerModel = require('./models/developer/developer.model.js')(mongoose);
    var courseModel = require('./models/course/course.model')(mongoose);
    var likeModel = require('./models/like/like.model')(mongoose);
    var followModel = require('./models/follow/follow.model')(mongoose);


    var studentService = require('./services/student.service.server')(app, studentModel, developerModel, courseModel);
    var developerService = require('./services/developer.service.server')(app, studentModel, developerModel, courseModel);
    var courseService = require('./services/course.service.server')(app, studentModel, developerModel, courseModel);
    var contentService = require('./services/content.service.server')(app, studentModel, developerModel, courseModel);

    var likeService = require('./services/like.service.server')(app, likeModel);
    var followService = require('./services/follow.service.server')(app, followModel);
};