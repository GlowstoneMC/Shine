"use strict";
const site = require("./site.js");
const users = require("./users.js");

function Router(app) {
  // index
  app.get("/", site.index);

  // users
  app.get("/login/:username", users.login);
}

module.exports = Router;
