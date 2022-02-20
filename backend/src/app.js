var express = require("express");
var logger = require("morgan");
const cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

module.exports = app;
