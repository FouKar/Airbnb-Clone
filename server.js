const express = require("express");
const exphbs = require("express-handlebars");
const roomDb = require("./model/rooms.js");
const bodyParser=require("body-parser");
const app = express();
const dotenv=require('dotenv');
require('dotenv').config({path: 'keys.env'});
const HTTP_PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
  })
);
app.get("/", (req, res) => {
  res.render("home", {
    data: roomDb.room,
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/roomlist", (req, res) => {
  res.render("roomlist", {
    data: roomDb.room,
  });
});
app.get("/dashboard",(req,res)=>{
  res.render("dashboard");
});
//Registration Form Validation
app.post("/reg",(req,res)=>{
  let registration = new Promise((resolve, reject) => {
    let returnObj = {
      fN: "",
      fNmErr: null,
      lN: null,
      lNmErr: null,
      eM: null,
      eMErr: null,
      pass: null,
      passErr: null,
      cBox: null,
      cBoxErr: null,
      phoneNum: null,
      phoneNumErr: null,
      bday: null,
      bdayErr:null,
      bmon:null,
      bmonErr:null,
      bYr:null,
      bYrErr:null
    };
    if (req.body.fName.length > 0) {
      if (req.body.fName.length >= 2 && req.body.fName.length < 30) {
        returnObj.fN = req.body.fName;
      } else {
        returnObj.fNmErr = "Enter first name between 2 and 30 characters";
      }
    } else {
      returnObj.fNmErr = "Please fill out first name";
    }
    if (req.body.lName.length > 0) {
      if (req.body.lName.length >= 2 && req.body.lName.length < 30) {
        returnObj.lN = req.body.lName;
      } else {
        returnObj.lNmErr = "Enter last name between 2 and 30 characters";
      }
    } else {
      returnObj.lNmErr = "Please fill out last name";
    }
    if (req.body.emailLogReg.length > 0) {
      if (/^\w+(\.?\w)*@\w+\.[A-Za-z]{2,3}$/.test(req.body.emailLogReg)) {
        returnObj.eM = req.body.emailLogReg;
      } else {
        returnObj.eMErr = "Please enter an appropriate email format";
      }
    } else {
      returnObj.eMErr = "Please fill out email";
    }
    if (req.body.phone.length > 0) {
      if (/^[0-9]{3}[-]?\s*[0-9]{3}[-]?\s*[0-9]{4}$/.test(req.body.phone)) {
        returnObj.phoneNum = req.body.phone;
      } else {
        returnObj.phoneNumErr =
          "Please enter the following format ###-###-####";
      }
    } else {
      returnObj.phoneNumErr = "Please fill out the phone number";
    }
    if (req.body.passLogReg.length > 0) {
      if (
        /^(?=.*[!@#$%^&*-+{}])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*-+{}]{8,32}$/.test(
          req.body.passLogReg
        )
      ) {
        returnObj.pass = req.body.passLogReg;
      } else {
        returnObj.passErr =
          "Please create password with one Upper Case Letter, One Number and one special character (!@#$%^&*-+{})";
      }
    } else {
      returnObj.passErr = "Please fill out the password";
    }
    if (req.body.ckBox) {
      returnObj.cBox = true;
    } else {
      returnObj.cBox = false;
      returnObj.cBoxErr = "You must agree to Terms of Service";
    }
    if(req.body.bday){
      returnObj.bday=req.body.bday;
    }
    else{
      returnObj.bdayErr="Enter The day"
    }
    if(req.body.bmon){
      returnObj.bmon=req.body.bmon;
    }
    else{
      returnObj.bmonErr="Enter The Month"
    }
    if(req.body.bYr){
      returnObj.bYr=req.body.bYr;
    }
    else{
      returnObj.bYrErr="Enter The Year"
    }

    if (
      returnObj.fN &&
      returnObj.lN &&
      returnObj.eM &&
      returnObj.pass &&
      returnObj.cBox &&
      returnObj.phoneNum &&
      returnObj.bday &&
      returnObj.bmon &&
      returnObj.bYr
    ) {
      resolve(returnObj);
      return;
    } else {
      reject(returnObj);
      return;
    }
  });
  registration
    .then((inData) => {
      const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: `${inData.eM}`, // Change to your recipient
  from: 'fk900@hotmail.com', // Change to your verified sender
  subject: 'Igloo Login Credentials',
  text: `${inData.fN} ${inData.lN}, Here is your username and password:`,
  html: `Email: <strong>${inData.eM}</strong><br>
         Password: <strong>${inData.pass}</strong>
         Phone ${inData.phoneNum}`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
      res.render("dashboard",{
        em:inData.eM,
        fName: inData.fN,
        lName: inData.lN
      });
    })
    .catch((inData) => {
      res.render("register", {
        fN: inData.fN,
        fNmErr: inData.fNmErr,
        lN: inData.lN,
        lNmErr: inData.lNmErr,
        em: inData.eM,
        pass: inData.pass,
        eMErr: inData.eMErr,
        passErr: inData.passErr,
        cBox: inData.cBox,
        cBoxErr: inData.cBoxErr,
        phone: inData.phoneNum,
        phoneErr: inData.phoneNumErr,
        bday:inData.bday,
        bdayErr:inData.bdayErr,
        bmon: inData.bmon,
        bmonErr: inData.bmonErr,
        bYr:inData.bYr,
        bYrErr:inData.bYrErr
      });
    });
});

//Login Form Validation
app.post("/login",(req,res)=>{
  let login = new Promise((resolve, reject) => {
    let returnObj = {
      email: null,
      password: null,
      emailErr: null,
      passErr: null,
    };
    if (req.body.emailLog.length > 0 && req.body.passLog.length > 0) {
      returnObj.password = req.body.passLog;
      returnObj.email = req.body.emailLog;
      resolve(returnObj);
      return;
    } else if (req.body.emailLog.length > 0) {
      returnObj.email = req.body.emailLog;
      returnObj.passErr = "Please Enter your password";
      reject(returnObj);
      return;
    } else if (req.body.passLog.length > 0) {
      returnObj.password = req.body.passLog;
      returnObj.emailErr = "Please Enter your email";
      reject(returnObj);
      return;
    } else {
      returnObj.passErr = "Please Enter your password";
      returnObj.emailErr = "Please Enter your email";
      reject(returnObj);
      return;
    }
  });
  
  login
  .then((inData) => {
      res.render("dashboard",{
        em:inData.email
      });
    })
    .catch((inData) => {
      res.render("login", {
        em: inData.email,
        pswd: inData.password,
        emErr: inData.emailErr,
        pErr: inData.passErr,
      });
    })
});
app.use((req, res, next) => {
  res.status(404).send("Sorry, Page Not Found! Try another link.");
});

app.listen(HTTP_PORT, () => {
  console.log("Listening on PORT: " + HTTP_PORT);
});
