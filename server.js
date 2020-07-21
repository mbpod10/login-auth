const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
//const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const userController = require("./controllers/userRoutes");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userController);

app.set("port", process.env.PORT || 8080);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
