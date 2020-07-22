const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const userController = require("./controllers/userRoutes");

//app.use(cors());
app.use(cors({ origin: true, credentials: true }));

// prevent CORS problems
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userController);

app.set("port", process.env.PORT || 8080);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
