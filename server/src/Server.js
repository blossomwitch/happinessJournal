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

app.get("/teacherToken", (request, response) => {
  response.send({
    token: "teacher",
  });
});

app.get("/studentToken", (request, response) => {
  response.send({
    token: "student",
  });
});

app.use((request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

app.listen(8080, () => console.log("Listening on port 8080"));
