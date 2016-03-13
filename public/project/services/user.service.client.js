(function () {

    angular
        .module('CourseraApp')
        .factory('UserService', UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 011,
                    "firstName": 'Bob',
                    "lastName": 'Dylan',
                    "username": 'bob',
                    "password": 'bob',
                    "role": 'student',
                    "registered_course_ids": ""
                },
                {
                    "_id": 101,
                    "firstName": 'Nicola',
                    "lastName": 'Tesla',
                    "username": 'tesla',
                    "password": 'tesla',
                    "role": 'developer',
                    "developed_course_ids": ""
                }
            ]
        };
    }

})();