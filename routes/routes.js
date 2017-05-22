"use strict";
const site = require("./site.js");
const users = require("./users.js");

module.exports = function (app, passport) {
  // index
  app.get("/", site.index);

  // users
  app.get("/login", users.login);
  app.get("/register", users.register);

  // authentication
  app.post("/login",
    passport.authenticate("login", {
      successRedirect: "/",
      failureRedirect: "/login",
      badRequestMessage: "Invalid username or password!",
      failureFlash: true
    })
  );

  app.post("/register",
    passport.authenticate("register", {
      successRedirect: "/login",
      failureRedirect: "/register",
      failureFlash: true
    })
  );
};
