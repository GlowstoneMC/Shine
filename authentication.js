const User = require("./user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const saltRounds = 10;

function Authentication(database) {
// configure session persistence
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    done(null, database.getById(id));
  });

  // strategies for login and register
  passport.use("login", new LocalStrategy({passReqToCallback: true}, function (req, username, password, done) {
    if (req.session.user) {
      console.log("attempted login when already signed in");
      return done(null, false, req.flash("error", "Sign out before signing in!"));
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
      req.session.user = user.info;
      return done(null, user);
    });
  }));

  passport.use("register", new LocalStrategy({passReqToCallback: true}, function (req, username, password, done) {
    // check if username already exists
    if (database.getByUsername(username)) {
      console.log("username taken:" + username);
      return done(null);
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
      var user = new User(database.getNextId(), username, hash, req.params["email"]);

      if (err) {
        return done(err);
      }

      console.log("registered");
      // registered
      database.add(user);
      return done(null, user);
    });
  }));

  return passport;
}

module.exports = Authentication;
