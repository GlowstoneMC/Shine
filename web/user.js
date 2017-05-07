function User(name) {
    this.name = name;
}

User.prototype.getName = function() {
    return name;
}

module.exports = User;


