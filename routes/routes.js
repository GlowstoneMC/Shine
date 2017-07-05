"use strict";
const Database = require("../database.js");
const configurePassport = require("../authentication.js");

module.exports = function (app, passport) {
  var database = new Database();

  var authentication = configurePassport(passport, database);
  var site = require("./site.js");
  var users = require("./users.js");

  app.use(site);
  app.use(users);
  app.use(authentication);
};
