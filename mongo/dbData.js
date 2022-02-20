db.login.drop();
db.student.drop();

db.login.insert([
    {
        "email": "admin",
        "password": "admin"
    },
    {
        "email": "sarahjanebaird@gmail.com",
        "password": "$2b$10$YJGE1QQ7905ttBiEKxwQ6ewnhiyRDVK2Wx7.GQ5KnQk3KWVYKi7oW"
    }
]);

db.student.insert([
    {
        "firstName": "Sarah",
        "lastName": "Baird",
        "email": "sarahjanebaird@gmail.com",
        "reflections":[
            {"date":"Week of February 7 to February 13", "exerciseTime":"10 min","exerciseType":"yoga", "meditation":"10min", "kindness":"Held a door", "gratitude": "thankful for spring on the way", "journal": "walked the dogs today", "final":"got a lot done"},
        ]
    }
])