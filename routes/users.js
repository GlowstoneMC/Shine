"use strict";
module.exports.login = function (req, res) {
  res.render("login", {
    "brand": {
      "name": "Shine"
    },
    "libraries": {
      "jquery": "3.2.1",
      "bootstrap": "3.3.7"
    },
    "alerts": {
      "error": req.flash("error")
    },
    "user": req.user
  });
};

module.exports.register = function (req, res) {
  res.render("register", {
    "brand": {
      "name": "Shine"
    },
    "libraries": {
      "jquery": "3.2.1",
      "bootstrap": "3.3.7"
    },
    "user": req.user
  });
};
