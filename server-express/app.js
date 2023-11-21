var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();

var cors = require('cors')

app.use(cors()) 

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./setupMongo")();

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/ToDo"));
// app.use("/get", require("./routes/get"));

module.exports = app;