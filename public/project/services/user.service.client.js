(function () {

    angular
        .module('CourseraApp')
        .service('UserService', UserService);

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

            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            registerUser: registerUser,
            findUserById: findUserById,
            deleteUserFromId: deleteUserFromId,

            updateUser: updateUser,
            addCourseToUser: addCourseToUser,
            removeCourseFromUser: removeCourseFromUser,
            addCourseToDeveloper: addCourseToDeveloper,

            getUserFromCredentials: getUserFromCredentials,
            getListOfStudents: getListOfStudents,
            getListOfDevelopers: getListOfDevelopers
        };

        return model;

        /* List of Methods */
        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            console.log("Updating currentUser: " + user);
            $rootScope.currentUser = user;
        }

        function registerUser(user) {
            // TODO: also check for already present userIds

            var user = {
                "_id": 22,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "role": 'developer',
                "developed_course_ids": []
            };

            model.users.push(user);
            return user;
        }

        function findUserById(userId) {
            for (var index in model.users) {
                if (model.users[index]._id == userId) {
                    return model.users[index];
                }
            }
        }

        function registerStudent(user) {
            // TODO: also check for already present userIds

            var user = {
                "_id": 22,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "role": 'student',
                "registered_course_ids": []
            };

            model.users.push(user);
            return user;
        }

        function deleteUserFromId(userId) {

            var deleteIndex = -1;

            for (userIndex in model.users) {
                var id = model.users[userIndex]._id;
                if (id == userId) {
                    deleteIndex = userIndex;
                }
            }

            if (deleteIndex != -1)
                users.splice(deleteIndex);
        }

        function updateUser(userId, user) {

            for (var userIndex in users) {
                if (model.users[userIndex]._id == userId) {
                    if (model.users[userIndex].role != user.role)
                        console.log("Illegal Operation Attempted. Roles can not be modified");

                    model.users[userIndex].firstName = user.firstName;
                    model.users[userIndex].lastName = user.lastName;
                    model.users[userIndex].username = user.username;
                    model.users[userIndex].password = user.password;

                    if (isDeveloper(user)) {
                        model.users[userIndex].developed_course_ids = user.developed_course_ids;
                    } else {
                        model.users[userIndex].registered_course_ids = user.registered_course_ids;
                    }
                }
            }
        }

        function addCourseToUser(userId, courseId) {
            var user = findUserById(userId);
            if (isDeveloper(user)) {
                user.developed_course_ids.push(courseId);
            }
            else {
                user.registered_course_ids.push(courseId);
            }
        }

        function removeCourseFromUser(userid, courseId) {
            // TODO: fix on the separation between users
        }

        // TODO: check if courseId is available
        function addCourseToDeveloper(userId, courseId) {
            var user = findUserById(userId);
            user.developed_course_ids.push(courseId);
        }

        function getUserFromCredentials(useraname, password) {
            for (var index in model.users) {
                var user = model.users[index];
                if (user.username == useraname && user.password == password) {
                    return user;
                }
            }

            console.log("getUserIdFromCredentials: User not found");
        }

        function getListOfStudents() {
            var students = [];
            for (var userIndex in users) {
                var user = users[userIndex];
                if (isStudent(user)) {
                    students.push(user);
                }
            }

            return students;
        }

        function getListOfDevelopers() {
            var developers = [];
            for (var userIndex in users) {
                var user = users[userIndex];
                if (isDeveloper(user)) {
                    developers.push(user);
                }
            }

            return developers;
        }

        // Helper methods
        function isStudent(user) {
            return user.role === 'student';
        }

        function isDeveloper(user) {
            return user.role === 'developer';
        }
    }

})();