const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const userController = require("./controllers/userRoutes");

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userController);

// const User = require("./models/User");

// const userInput = {
//   username: "mbpod20",
//   password: "1234567",
//   role: "admin",
// };

// const user = new User(userInput);

// user.save((err, user) => {
//   if (err) console.log(err);
//   else console.log(user);
// });

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
