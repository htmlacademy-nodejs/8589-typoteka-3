'use strict';

const PACKAGE_JSON = require(`../../../package.json`);

module.exports = {
  start() {
    console.info(PACKAGE_JSON.version);
  }
};
