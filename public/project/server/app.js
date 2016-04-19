module.exports = function (app, db, mongoose) {

    var studentModel = require('./models/student/student.model.js')(mongoose);
    var developerModel = require('./models/developer/developer.model.js')(mongoose);
    var courseModel = require('./models/course/course.model')(mongoose);

    var studentService = require('./services/student.service.server')(app, studentModel, developerModel, courseModel);
    var developerService = require('./services/developer.service.server')(app, studentModel, developerModel, courseModel);
    var courseService = require('./services/course.service.server')(app, studentModel, developerModel, courseModel);
    var contentService = require('./services/content.service.server')(app, studentModel, developerModel, courseModel);

};