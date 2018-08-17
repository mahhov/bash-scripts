#!/usr/bin/env node

const readline = require('readline');
const Filterer = require('./Filterer');
const filterText = process.argv[2];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  if (Filterer.filterText(line, filterText))
    console.log(line);
});
