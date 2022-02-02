let express = require("express");
let cors = require("cors");
let path = require("path");
let MongoClient = require("mongodb").MongoClient;
let sanitizer = require("express-sanitizer");
let ObjectId = require("mongodb").ObjectId;

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

    if (login[0] === undefined || request.body.password !== login[0].password) {
      response.status(406);
      response.send({ error: "Incorrect Username or Password" });
      mongoClient.close();
      return;
    } else {
      response.send({ success: "Login Credentials Correct" });
      response.status(200);
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
    await mongoClient.connect();

    // get references to both collections in the db
    let loginCollection = mongoClient.db(DB_NAME).collection("login");
    let studentCollection = mongoClient.db(DB_NAME).collection("student");

    // sanitize the form input
    request.body.email = request.sanitize(request.body.email);
    request.body.password = request.sanitize(request.body.password);
    request.body.firstName = request.sanitize(request.body.firstName);
    request.body.lastName = request.sanitize(request.body.lastName);

    // seperate the data
    let loginInfo = {
      email: request.body.email,
      password: request.body.password,
    };

    let studentInfo = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
    };

    // add the documents to the collections
    let result = await studentCollection.insertOne(studentInfo);

    // status code for created
    response.status(200);
    response.send(result);
  } catch (error) {
    response.status(500);
    response.send({ error: error.message });
    throw error;
  } finally {
    mongoClient.close();
  }
});

app.use((request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

app.listen(8080, () => console.log("Listening on port 8080"));
