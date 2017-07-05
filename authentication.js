const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("./user.js");

const saltRounds = 10;

function configurePassport(passport, database) {
// configure session persistence
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    done(null, database.getById(id));
  });

  // strategies for login and register
  passport.use("login", new LocalStrategy({passReqToCallback: true}, function (req, username, password, done) {
    if (req.user) {
      // already signed in
      return done(null, req.user);
    }

    var user = database.getByUsername(username);

    if (!user) {
      // user does not exist
      return done(null, false, req.flash("error", "Invalid username or password!"));
    }

    bcrypt.compare(password, user.password, function (err, res) {
      if (err) {
        return done(err);
      }

      if (!res) {
        // password is incorrect
        return done(null, false, req.flash("error", "Invalid username or password!"));
      }

      // valid auth
      return done(null, user);
    });
  }));

  router.post("/login",
    passport.authenticate("login", {
      successRedirect: "/",
      failureRedirect: "/login",
      badRequestMessage: "Invalid username or password!",
      failureFlash: true
    })
  );

  router.post("/register", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    if (req.user) {
      // already signed in
      res.redirect("/");
      return;
    }

    // check if inputs are undefined
    if (!username || !password || !email) {
      res.redirect("/register");
      return;
    }

    // check if username already exists
    if (database.getByUsername(username)) {
      console.log("username taken:" + username);
      res.redirect("/register");
      return;
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
      var user = new User(database.getNextId(), username, hash, email);

      if (err) {
        throw err;
      }

      console.log("registered");
      // registered
      database.add(user);
      res.redirect("/login");
    });
  });

  return router;
}

module.exports = configurePassport;
