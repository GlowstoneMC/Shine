const User = require("./user.js");

function Database() {
  var currentId = 1;

  // in memory database.
  // default username and password: admin, admin.
  const users = {0: new User(0, "admin", "$2a$10$ftm/GrA7R6Hh6v/oMIl4juY9dUmet2NyJoHwXkA1eb1pmo4DlU4Nu", "email@example.com")};

  return {
    getNextId: function () {
      return currentId++;
    },

    add: function (user) {
      users[user.id] = user;
    },

    getById: function (id) {
      return users[id];
    },

    getByUsername: function (username) {
      var keys = Object.keys(users);

      for (var i = 0; i < keys.length; i++) {
        var user = users[i];

        if (user.username.toLowerCase() === username.toLowerCase()) {
          return user;
        }
      }

      return null;
    }
  };
}

module.exports = Database;
