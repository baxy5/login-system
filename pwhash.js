const bcrypt = require("bcrypt");
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://bakszy:asdasd@cluster0.ov4ny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const saltRounds = 10;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;

  let dbo = db.db("mydb");
  dbo.collection("admin-login-data").findOne({}, (err, res) => {
    let password = res.password;

    console.log(password);

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        let myQuery = { username: "admin" };
        let hashedPassword = { $set: { password: hash } };

        dbo
          .collection("admin-login-data")
          .updateOne(myQuery, hashedPassword, (err, res) => {
            if (err) throw err;

            console.log("password updated!");
            db.close();
          });
      });
    });
  });
});
