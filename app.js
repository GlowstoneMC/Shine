"use strict";
const http = require("http");
const express = require("express");
const path = require("path");
const flash = require('connect-flash-plus');

// const favicon = require("serve-favicon");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");
// const multer = require("multer");
const errorHandler = require("errorhandler");

const app = express();
const registerRoutes = require("./routes/routes.js");
const hbs = require("hbs");
const Database = require("./database.js");
const passport = require("./authentication.js")(new Database());

const sessionSettings = {
  secret: "muhbigsecret",
  cookie: {},
  saveUninitialized: true,
  resave: false
};

// register all partials from directory.
hbs.registerPartials("./views/partials");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use(logger("dev"));
app.use(methodOverride());
app.use(session(sessionSettings));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(multer({ dest: './uploads' }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

registerRoutes(app, passport);

app.use(errorHandler());

http.createServer(app).listen(80, () => {
  console.log("Server started.");
});
