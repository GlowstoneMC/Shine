"use strict";
function User(name) {
  this.name = name;
}

User.prototype.getName = function() {
  return this.name;
};

module.exports = User;
