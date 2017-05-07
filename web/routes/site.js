"use strict";
module.exports.index = function (req, res) {
  const session = req.session;

  res.render("index", {
    "brand": {
      "name": "Shine"
    },
    "libraries": {
      "jquery": "3.2.1",
      "bootstrap": "3.3.7"
    },
    "user": session.user
  });
};
