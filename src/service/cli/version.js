'use strict';
const {blue} = require(`chalk`);

const PACKAGE_JSON = require(`../../../package.json`);

module.exports = {
  start() {
    console.log(blue(PACKAGE_JSON.version));
  }
};
