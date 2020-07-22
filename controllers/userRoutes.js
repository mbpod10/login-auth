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
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

router.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const todo = new Todo(req.body);
    todo.save((error) => {
      if (error) {
        res
          .status(500)
          .json({ message: { msgBody: "Error has occurred", msgError: true } });
      } else {
        req.user.todos.push(todo);
        req.user.save((error) => {
          if (error) {
            res.status(500).json({
              message: { msgBody: "Error has occurred", msgError: true },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully created todo",
                msgError: false,
                created: req.body.name,
              },
            });
          }
        });
      }
    });
  }
);

router.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("todos")
      .exec((error, document) => {
        if (error) {
          res.status(500).json({
            message: { msgBody: "Error has occurred", msgError: true },
          });
        } else {
          res.status(200).json({ todos: document.todos, authenticated: true });
        }
      });
  }
);

router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else {
      res
        .status(403)
        .json({ message: { msgBody: "Not an Admin", msgError: true } });
    }
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    if (!req.user.username) {
      res
        .status(403)
        .json({ isAuthenticated: false, user: { username, role } });
    }
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = router;
