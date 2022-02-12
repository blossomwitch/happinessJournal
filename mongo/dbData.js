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
        "email": "w000000@nscc.ca",
        "saved":{
            "exerciseTime":"10 min",
            "exerciseType":"yoga", 
            "meditation":"10min", 
            "kindness":"Held a door", 
            "gratitude": "thankful for spring on the way", 
            "journal": "walked the dogs today"
        },
        "reflections":[
            {"date":"feb. 12, 2022", "exerciseTime":"10 min","exerciseType":"yoga", "meditation":"10min", "kindness":"Held a door", "gratitude": "thankful for spring on the way", "journal": "walked the dogs today", "final":"got a lot done"},
        ]
    }
])