'use strict';

const help = require(`./cli/help`);
const version = require(`./cli/version`);
const generate = require(`./cli/generate`);


const [,, option, count] = process.argv;

switch (option) {
  case `--help`:
    help.start();
    break;
  case `--version`:
    version.start();
    break;
  case `--generate`:
    generate.start(count);
    break;
  default:
    help.start();
}
