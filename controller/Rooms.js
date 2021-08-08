/*********************Task ROUTES***************************/
const express = require("express");
const router = express.Router();

//import the taskModel local module .js is optional
const roomsModel = require("../models/rooms.js");
const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const loggedInUser = require("../middleware/auth");
const dashboardL = require("../middleware/authorization");
