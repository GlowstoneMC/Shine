"use strict";
module.exports.index = function (req, res) {
  res.render("index", {
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
