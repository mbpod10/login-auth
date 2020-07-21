const mongoose = require("./dbs/connection");
const db = mongoose.connection;
const User = require("./models/User");
const { response } = require("express");

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// const main = async () => {
//   await User.deleteMany({});
//   const user = {
//     username: "mbpod20",
//     password: "1234567",
//     role: "admin",
//   };
//   await User.insertMany(user);
//   console.log("Created some items!");
// };
// const run = async () => {
//   await main();
//   db.close();
// };

// run();

//const User = require("./models/User");

const userInput = {
  username: "mbpod20",
  password: "1234567",
  role: "admin",
};

const user = new User(userInput);

user.save((err, user) => {
  if (err) console.log(err);
  else console.log(user);
});
