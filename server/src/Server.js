let express = require("express");
let cors = require("cors");
let path = require("path");
let MongoClient = require("mongodb").MongoClient;
let sanitizer = require("express-sanitizer");
let ObjectId = require("mongodb").ObjectId;
let axios = require("axios");
const bcrypt = require("bcrypt");

const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbData";

let app = express();
app.use(cors());

app.use(express.json());
app.use(sanitizer());

const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
app.use("/", express.static(CLIENT_BUILD_PATH));

// THIS IS FOR TESTING ONLY - DELETE BEFORE DEPLOYMENT !!!!!!!!!!!!!!!!!!!
app.get("/get", async (request, response) => {
  let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
  try {
    await mongoClient.connect();

    let db = mongoClient.db(DB_NAME);
    let loginArray = await db.collection("login").find().toArray();
    let studentArray = await db.collection("student").find().toArray();
    let json = {
      logins: loginArray,
      students: studentArray,
    };
    response.status(200);
    response.send(json);
  } catch (error) {
    response.status(500);
    response.send({ error: error.message });
    throw error;
  } finally {
    mongoClient.close();
  }
});
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ^^^^^^

app.get("/getStudentInfo", async (request, response) => {
  let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
  try {
    await mongoClient.connect();

    let db = mongoClient.db(DB_NAME);
    let studentArray = await db.collection("student").find().toArray();
    let json = {
      students: studentArray,
    };
    response.status(200);
    response.send(json);
  } catch (error) {
    response.status(500);
    response.send({ error: error.message });
    throw error;
  } finally {
    mongoClient.close();
  }
});

// LOGIN -------------------------------------------------------------------
app.post("/login", async (request, response) => {
  let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });

  try {
    await mongoClient.connect();

    request.body.email = request.sanitize(request.body.email);
    request.body.password = request.sanitize(request.body.password);

    let db = mongoClient.db(DB_NAME);
    // get reference to database via name and return the object that matches the users email
    let login = await db
      .collection("login")
      .find({ email: request.body.email })
      .toArray();

    // the the login email doesn't exist
    if (login[0] === undefined) {
      response.status(406);
      response.send({ error: "Incorrect Username or Password" });
      mongoClient.close();
      return;
    } else {
      // compare the password to the hashed password in the database
      bcrypt.compare(
        request.body.password,
        login[0].password,
        function (err, result) {
          if (!result) {
            response.status(406);
            response.send({ error: "Incorrect Username or Password" });
            mongoClient.close();
            return;
          } else {
            response.send({ success: "Login Credentials Correct" });
            response.status(200);
          }
        }
      );
    }
  } catch (error) {
    response.status(500);
    response.send({ error: error.message });
    throw error;
  } finally {
    mongoClient.close();
  }
});

// CREATE ACCOUNT -------------------------------------------------------------------
app.post("/createAccount", async (request, response) => {
  let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });

  try {
    // sanitize the form input
    request.body.email = request.sanitize(request.body.email);
    request.body.password = request.sanitize(request.body.password);
    request.body.firstName = request.sanitize(request.body.firstName);
    request.body.lastName = request.sanitize(request.body.lastName);

    // salt/hash the password add Login to database
    bcrypt.genSalt(10, function (err, salted) {
      bcrypt.hash(request.body.password, salted, function (err, hashed) {
        mongoClient.connect();
        let loginCollection = mongoClient.db(DB_NAME).collection("login");
        let studentCollection = mongoClient.db(DB_NAME).collection("student");

        let loginInfo = {
          email: request.body.email,
          password: hashed,
        };
        loginCollection.insertOne(loginInfo);

        // add Student to database
        let studentInfo = {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          email: request.body.email,
        };
        studentCollection.insertOne(studentInfo);
      });
    });

    // status code for created
    response.status(200);
    response.send("Student Created");
  } catch (error) {
    response.status(500);
    response.send({ error: error.message });
    throw error;
  } finally {
    mongoClient.close();
  }
});

// recaptcha verification
app.post("/recaptcha", async (request, response) => {
  try {
    // send the secret key and the generated key to google for verification
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${request.body.secret}&response=${request.body.response}`
    );

    if (res.data.success) {
      response.status(200);
      response.send("ReCaptcha Verification Passed");
    } else {
      response.status(500);
      response.send("ReCaptcha Verification Failed");
    }
  } catch (error) {
    response.status(500);
    console.log("ReCaptcha error");
    response.send({ error: error.message });
    throw error;
  }
});

app.use((request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

app.listen(8080, () => console.log("Listening on port 8080"));
