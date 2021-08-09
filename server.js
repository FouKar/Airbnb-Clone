const express = require("express");
const fileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");
const userController = require("./controller/User.js");
const roomController = require("./controller/Rooms.js");
const session = require("express-session");
const rooms = require("./model/rooms.js");
const multer = require("multer");
var upload = multer({ dest: "../public/img/" });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roomDb = require("./model/rooms.js");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config({ path: "keys.env" });
const HTTP_PORT = process.env.PORT;
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
  })
);
app.use((req, res, next) => {
  //variable is method in the URL
  if (req.query.method == "PUT") {
    //Change the HTTP method of the request to PUT
    req.method = "PUT";
  } else if (req.query.method == "DELETE") {
    //Change the HTTP method of the request to DELETE
    req.method = "DELETE";
  }
  next();
});

//must call fileUpload package before all of your routes
//attach the package to express
app.use(fileUpload());
app.use(
  session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
    //cookie: {secure:true}-> Only works for HTTPS. We are using The HTTP Protocol
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session.userInfo;
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use("/User/", userController);
app.use("/room", roomController);
app.get("/", (req, res) => {
  rooms
    .find()
    .lean()
    .then((rm) => {
      res.render("home", {
        data: rm,
      });
    });
});

app.get("/roomlist", (req, res) => {
  rooms
    .find({})
    .lean()
    .then((rm) => {
      res.render("roomlist", {
        data: rm,
      });
    });
});
app.post("/search", (req, res) => {
  let loc = req.body.location;
  rooms
    .find({ city: loc })
    .lean()
    .then((rm) => {
      res.render("roomlist", {
        data: rm,
      });
    });
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, Page Not Found! Try another link.");
});

app.listen(HTTP_PORT, () => {
  console.log("Listening on PORT: " + HTTP_PORT);

  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    });
});
