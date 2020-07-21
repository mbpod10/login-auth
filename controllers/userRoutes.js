const express = require("express");
const router = express.Router();
const User = require("../models/User");

// router.get("/", (req, res) => {
//   User.find({}, (error, users) => {
//     if (error) console.log(error);
//     else res.json(users);
//   });
// });

router.get("/", (req, res) => {
  User.find({}, (error, users) => {
    if (error) console.log(error);
    else res.json("Hello");
  });
});

module.exports = router;
