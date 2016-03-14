console.log("UserService Tests");

var users = [
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
];

//console.log(users[0]);

users.sp

for (index in users) {
    console.log(users[index]._id);
    var user = users[index];
    if (user.role === 'student') {
        console.log(user.firstName + " is a student");
    }
    else {
        console.log(user.firstName + " is a developer");
    }

}