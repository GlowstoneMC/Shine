"use strict";
function User(id, username, password, email) {
  this.id = id;
  this.username = username;
  this.password = password;
  this.email = email;
  this.info = {
    "name": username,
    "email": email
  };
}

module.exports = User;
