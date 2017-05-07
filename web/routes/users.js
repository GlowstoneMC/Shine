const User = require("../user.js");

module.exports.login = function (req, res) {
    var session = req.session;

    if (!session.user) {
        session.user = new User(req.params.username);
    }

    res.redirect("/");
}