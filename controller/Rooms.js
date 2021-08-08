/*********************Task ROUTES***************************/
const express = require("express");
const router = express.Router();

//import the taskModel local module .js is optional
const roomsModel = require("../models/rooms.js");
const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const loggedInUser = require("../middleware/auth");
const userService = require("../services/UserService.js");
const dashboardL = require("../middleware/authorization");

router.get("/createroom", loggedInUser, userService.createRoom);

//Route to process user's request and data when the user submits the add task form
router.post("/add", (req, res) => {
  /*Rules for inserting into a MongoDB database USING 
      MONGOOSE is to do the following:
  
      1. You have to create an instance of the model, you 
      mass pass the data that you want to be inserted 
      in the form of an object(object literal)
      2. From the instance, you call the save method*/

  const newRoom = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
  };
  //status and date created are not being created because they already have
  //default values. Automtically set status as open and pull the date from the date of the machine from the server

  const room = new roomsModel(newRoom);
  //Created a new instance of the taskModel
  //new document that
  room
    .save()
    .then(() => {
      res.redirect("/room/list");
    })
    .catch((err) => {
      console.log(`Error happened when inserting into the 
    database ${err}`);
    });
  //->.save is an asynchronous method that returns a promise
});

////Route to fetch all tasks
router.get("/list", loggedInUser, (req, res) => {
  /*Pull from the database, get the results that
      was returned and then inject those results into the 
      taskDashboard*/
  // Search for all tasks that are open in status
  // to pull from a database, you use the find method.
  //To pull you don't need to create an instance of the model
  //find method will return all of the documents.
  roomsModel
    .find({})
    .then((rooms) => {
      /*filter out the information you need from the array of documents
          that was returned, into a new array
          */
      /* for (let i = 0; i < tasks.length; i++) {
          console.log(tasks[i]);
        }*/
      /* tasks.forEach((tasks) => {
          console.log(tasks);
        });*/
      //forEach allows you to traverse through an array, but does not
      //allow you to return a new array as the result
      /*Array has  documents meaning the array has 3 elements*/
      //.map method allows you to traverse through an array and filter through that array
      //and return a new array.
      let filteredRooms = rooms.map((rm) => {
        return {
          id: rm._id,
          title: rm.title,
          description: rm.description,
          price: rm.price,
          city: rm.city,
          province: rm.province,
          country: rm.country,
          file: rm.file,
        };
      });
      res.render("Rooms/roomDashboard", {
        data: filteredRooms,
      });
    })
    .catch((err) => `Error occurred when pulling from the database ${err}`);
});
//dynamic route created
//edit and delete requires us to use the id
//Going to prepopulate form data on edit page
router.get("/edit/:id", loggedInUser, (req, res) => {
  /*you want to query the database and pull all the document where the
      id attribute is equal to the id variable specified on the route*/
  //Use the find method when you want to pull multiple documents
  //If we want to pull a single value, we use findById
  //The way how mongoose shows dates and how HTML displays dates, there is a difference
  //You need to format your dates the way HTML formats the date. Use moment package to do so.
  roomModel
    .findById(req.params.id)
    .then((rm) => {
      const { _id, title, description, dueDate, priority, status } = rm;
      res.render("Rooms/editRooms", {
        _id,
        title,
        price,
        city,
        province,
        country,
        file,
      });
    })
    .catch((err) => console.log(`Error with retrieving the document ${err}`));

  //-> When you update something you use put request

  //-> When you click on a link, you send a get request
  /*-> A form cannot send a put or delete request, 
    it can only send a GET or a POST request*/
});

//Route to direct user to edit task form
//Route to update user data after they submit the form
//When you update something, you want to send a put request
//An HTML form cannot send a PUT request
router.put("/update/:id", loggedInUser, (req, res) => {
  const room = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    file: req.body.file,
  };
  roomsModel
    .updateOne({ _id: req.params.id }, room)
    .then(() => {
      res.redirect("/room/list");
    })
    .catch((err) => {
      console.log(`Error with updating rooms ${err}`);
    });
});

//router to delete user
router.delete("/delete/:id", loggedInUser, (req, res) => {
  roomsModel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/rooms/list");
    })
    .catch((err) => {
      console.log(`Error with updating rooms ${err}`);
    });
});
module.exports = router;
