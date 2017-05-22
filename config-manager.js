"use strict";
const fs = require("fs");
const configPath = "./config.json";

module.exports.defaults = {
  "port": 80
}

module.exports.exists = function () {
  return fs.existsSync(configPath);
}

module.exports.load = function () {
  if (!module.exports.exists()) {
    return null;
  }
  return require("./config.json");
}

module.exports.get = function (cfg, key) {
  if (!cfg[key]) {
    console.warn("Could not find key '" + key + "' in config, using default value.");
    return module.exports.getDefault(key);
  }
  return cfg[key];
}

module.exports.getDefault = function (key) {
  return module.exports.defaults[key];
}
