db.login.drop();
db.student.drop();

db.login.insert([
    {
        "email": "admin",
        "password": "$2b$10$PNHTrwAxItQ4CYVbcb2pNelRSrhD2CVEtwYnvBa7hMK7ClayXAZBm"
    },
    {
        "email": "sarahjanebaird@gmail.com",
        "password": "$2b$10$YJGE1QQ7905ttBiEKxwQ6ewnhiyRDVK2Wx7.GQ5KnQk3KWVYKi7oW"
    },
    {
        "email": "TEST@gmail.com",
        "password": "$2b$10$YJGE1QQ7905ttBiEKxwQ6ewnhiyRDVK2Wx7.GQ5KnQk3KWVYKi7oW"
    },
    {
        "email": "ANOTHERTEST@gmail.com",
        "password": "$2b$10$YJGE1QQ7905ttBiEKxwQ6ewnhiyRDVK2Wx7.GQ5KnQk3KWVYKi7oW"
    }
]);

db.student.insert([
    {
        "firstName": "Sarah",
        "lastName": "Baird",
        "email": "sarahjanebaird@gmail.com",
        "reflections":[
            {"date":"Week of February 7 to February 13", "exerciseTime":"10 min","exerciseType":"yoga", "meditation":"10min", "kindness":"Held a door", "gratitude": "thankful for spring on the way", "journal": "walked the dogs today", "final":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
            {"date":"Week of February 14 to February 20", "exerciseTime":"10 min","exerciseType":"yoga", "meditation":"10min", "kindness":"Held a door", "gratitude": "thankful for spring on the way", "journal": "walked the dogs today", "final":"got a lot done"},
            {"date":"Week of February 21 to February 27", "exerciseTime":"10 min","exerciseType":"yoga", "meditation":"10min", "kindness":"Held a door", "gratitude": "thankful for spring on the way", "journal": "walked the dogs today", "final":"got a lot done"},
        ]
    },
    {
        "firstName": "TEST",
        "lastName": "TEST",
        "email": "TEST@gmail.com",
        "reflections":[
            {"date":"Week of February 7 to February 13", "exerciseTime":"10 min","exerciseType":"yoga", "meditation":"10min", "kindness":"Held a door", "gratitude": "thankful for spring on the way", "journal": "walked the dogs today", "final":"got a lot done"},
        ]
    },    {
        "firstName": "ANOTHERTEST",
        "lastName": "ANOTHERTEST",
        "email": "ANOTHERTEST@gmail.com",
        "reflections":[
            {"date":"Week of February 7 to February 13", "exerciseTime":"10 min","exerciseType":"yoga", "meditation":"10min", "kindness":"Held a door", "gratitude": "thankful for spring on the way", "journal": "walked the dogs today", "final":"got a lot done"},
        ]
    }
])