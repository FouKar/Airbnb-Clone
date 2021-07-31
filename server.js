const express = require("express");
const exphbs = require("express-handlebars");
const userController=require('./controller/User.js');
const session=require("express-session");
const multer = require("multer");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const roomDb = require("./model/rooms.js");
const bodyParser=require("body-parser");
const app = express();
const dotenv=require('dotenv');
require('dotenv').config({path: 'keys.env'});
const HTTP_PORT = process.env.PORT;



app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
  })
);
app.use(session({
  secret:`${process.env.SECRET_KEY}`,
  resave:false,
  saveUninitialized: true,
  //cookie: {secure:true}-> Only works for HTTPS. We are using The HTTP Protocol
}));
app.use((req,res,next)=>{
  res.locals.user=req.session.userInfo;
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use("/User/", userController);
app.get("/", (req, res) => {
  res.render("home", {
    data: roomDb.room,
  });
});

app.get("/roomlist", (req, res) => {
  res.render("roomlist", {
    data: roomDb.room,
  });
});



app.use((req, res, next) => {
  res.status(404).send("Sorry, Page Not Found! Try another link.");
});

app.listen(HTTP_PORT, () => {
  console.log("Listening on PORT: " + HTTP_PORT);

  mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology:true
  }).then(()=>{
    console.log(`Connected to MongoDB`);
  }).catch((err)=>{
    console.log(`Error ${err}`);
  });
});

