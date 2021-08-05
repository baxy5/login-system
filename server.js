const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Database
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://bakszy:asdasd@cluster0.ov4ny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// CORS
const cors = require("cors");

// Bcrypt
const bcrypt = require("bcrypt");

/* In the latest version of express there is no need of that
const bodyParser = require('body-parser'); */

// for static files (CSS)
app.use(express.static(__dirname + "/client"));

/* In the latest version of express there is no need of that (deprecated)
app.use(bodyParser.urlencoded({extended: true})); */
// instead:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/client/adminLogin.html");
});

app.post("/admin", (req, res) => {
  const { username, password } = req.body;

  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;

      let dbo = db.db("mydb");
      dbo.collection("admin-login-data").findOne({}, (err, result) => {
        let hashedPassword = result.password;

        bcrypt.compare(password, hashedPassword, (err, resultBoolean) => {
          if (username == result.username && resultBoolean) {
            res.sendFile(__dirname + "/client/adminDashboard.html");
          } else {
            res.status(401).sendFile(__dirname + "/client/404error.html");
            // if you want a custome 404 error page you have to make a html
          }
        });

        db.close();
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
