(function () {

    angular
        .module('CourseraApp')
        .factory('UserService', UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 11,
                    "firstName": 'Bob',
                    "lastName": 'Dylan',
                    "username": 'bob',
                    "password": 'bob',
                    "role": 'student',
                    "registered_course_ids": [1]
                },
                {
                    "_id": 22,
                    "firstName": 'Nicola',
                    "lastName": 'Tesla',
                    "username": 'tesla',
                    "password": 'tesla',
                    "role": 'developer',
                    "developed_course_ids": [1, 2]
                }
            ],

            createUser: createUser,
            deleteUserFromId: deleteUserFromId,

            updateUserFromId: updateUserFromId,
            updateFirstName: updateFirstName,
            updateLastName: updateLastName,
            addCourseToUser: addCourseToUser,
            removeCourseFromUser: removeCourseFromUser,
            addCourseToDeveloper: addCourseToDeveloper,

            getUserIdFromCredentials: getUserIdFromCredentials,
            getListOfStudents: getListOfStudents,
            getListOfDevelopers: getListOfDevelopers
        };
    }

})();