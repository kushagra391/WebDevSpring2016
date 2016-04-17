module.exports = function (app, db, mongoose) {

    var studentModel = require('./models/student/student.model.js')(db, mongoose);
    var developerModel = require('./models/developer/developer.model.js')(db, mongoose);

    var studentService = require('./services/student.service.server')(app, studentModel, developerModel);
    var developerService = require('./services/developer.service.server')(app, studentModel, developerModel);
    var courseService = require('./services/course.service.server')(app, studentModel, developerModel);
    
};