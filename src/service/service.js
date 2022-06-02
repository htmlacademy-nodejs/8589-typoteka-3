'use strict';

const help = require(`./cli/help`);
const version = require(`./cli/version`);
const generate = require(`./cli/generate`);
const server = require(`./cli/server`);


const [,, option, arg] = process.argv;

switch (option) {
  case `--help`:
    help.start();
    break;
  case `--version`:
    version.start();
    break;
  case `--generate`:
    generate.start(arg);
    break;
  case `--server`:
    server.start(arg);
    break;
  default:
    help.start();
}
