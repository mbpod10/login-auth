const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Eatry",
      sub: userID,
    },
    "Eatry",
    { expiresIn: "1h" }
  );
};

router.get("/", (req, res) => {
  User.find({}, (error, users) => {
    if (error) console.log(error);
    else res.json(users);
  });
});

router.delete("/", (req, res) => {
  User.deleteMany({}, (error, user) => {
    if (error) console.log(error);
    else res.json(user);
  });
});

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (error, user) => {
    if (error) {
      res
        .status(500)
        .json({ message: { msgBody: "Error has occurred", msgError: true } });
    }
    if (user) {
      res
        .status(400)
        .json({ message: { msgBody: "User Already Exists", msgError: true } });
    } else {
      const newUser = new User({ username, password, role });
      newUser.save((error) => {
        if (error) {
          res.status(500).json({
            message: { msgBody: "Error has occurred", msgError: true },
          });
        } else {
          res
            .status(500)
            .json({ message: { msgBody: "Account Created", msgError: false } });
        }
      });
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

module.exports = router;
