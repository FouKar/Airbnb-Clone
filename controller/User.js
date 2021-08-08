const express = require("express");
const router = express.Router();
const userModel = require("../model/User.js");
const userService = require("../services/UserService.js");
const loggedInUser = require("../middleware/authentication.js");
const dashboardLoader = require("../middleware/authorization.js");
const {
  userFormValidation,
  loginValidation,
} = require("../middleware/validationMiddleware");
const bcrypt = require("bcrypt");
router.get("/register", userService.getRegistrationView);
router.post("/reg", userFormValidation, userService.processUserFormData);
router.get("/login", userService.getLoginView);
router.get("/logout", userService.logout);
router.post("/log", loginValidation, userService.processLogin);
router.get("/dashboard", loggedInUser, dashboardLoader);
router.get("/createroom", loggedInUser, userService.createRoom);
module.exports = router;
