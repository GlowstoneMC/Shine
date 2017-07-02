"use strict";
const router = require("express").Router();

router.get("/login", function (req, res) {
  if (req.user) {
    res.redirect("/");
  }

  res.render("login", {
    "alerts": {
      "error": req.flash("error")
    },
    "user": req.user
  });
});

router.get("/register", function (req, res) {
  if (req.user) {
    res.redirect("/");
  }

  res.render("register");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
