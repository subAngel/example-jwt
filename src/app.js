const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
require("./database");

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require("./controllers/authController"));

module.exports = app;
