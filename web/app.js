var express = require("express");
var web = express();
var swig = require('swig');
var session = require("express-session");

web.configure(() => {
  web.engine("html", swig.renderFile);
  web.set("view engine", "html");
  web.set("views", 'views');
});

var sessions = {};

var sess = {
  secret: "muhbigsecret",
  cookie: {},
  saveUninitialized: true,
  resave: false
}

web.use(session(sess));

web.get('/', (req, res) => {
  var encodedId = new Buffer(req.session.id).toString("base64");
  if (!sessions[encodedId]) {
    // new session
    sessions[encodedId] = {};
  }
  var s = sessions[encodedId];
  res.render("index", {
    "brand": {
      "name": "Shine"
    },
    "libraries": {
      "jquery": "3.2.1",
      "bootstrap": "3.3.7"
    },
    "session": s
  });
  console.log("sessions: " + JSON.stringify(sessions));
});

web.get('/login/:username', (req, res) => {
  var encodedId = new Buffer(req.session.id).toString("base64");
  if (!sessions[encodedId]) {
    // new session
    sessions[encodedId] = {};
  }
  var s = sessions[encodedId];
  if (!s.user) {
    sessions[encodedId].user = {
      name: req.params.username
    }
  }
  res.redirect("/");
});

web.listen(80, function() {
  console.log("Server started.");
})
