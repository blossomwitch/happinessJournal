db.login.drop();
db.student.drop();

db.login.insert([
    {
        "email": "admin",
        "password": "admin"
    },
    {
        "email": "w000000@nscc.ca",
        "password": "test0"
    },
    {
        "email": "w111111@nscc.ca",
        "password": "test1"
    },
    {
        "email": "w222222@nscc.ca",
        "password": "test2"
    },
    {
        "email": "w333333@nscc.ca",
        "password": "test3"
    },
]);

db.student.insert([
    {
        "firstName": "sally",
        "lastName": "nickelby",
        "email": "w000000@nscc.ca"
    }
])