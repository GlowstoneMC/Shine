"use strict";
module.exports.login = function (req, res) {
  res.render("login", {
    "alerts": {
      "error": req.flash("error")
    },
    "user": req.user
  });
};

module.exports.register = function (req, res) {
  res.render("register");
};
