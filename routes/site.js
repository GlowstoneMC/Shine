"use strict";
module.exports.index = function (req, res) {
  const session = req.session;

  res.render("index", {
    "user": session.user
  });
};
