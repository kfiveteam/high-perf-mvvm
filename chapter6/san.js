#!/usr/bin/env node

const yargs = require('yargs');
const initCommand = require('./init');

yargs
  // .usage('$0 <cmd> [args]')
  .command(initCommand)
  .argv;
