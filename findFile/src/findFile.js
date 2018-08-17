#!/usr/bin/env node

const readline = require('readline');
const Filterer = require('./Filterer');
const linkify = require('./Linkify');
const prefixDir = process.argv[2];
const filterText = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  if (!Filterer.filterText(line, filterText))
    return;

  let [, localDir, file] = line.match(/\.\/(.*)\/(.*)/);
  let fullPath = `${prefixDir}/${localDir}`;
  let link = linkify({localDir, file, fullPath});
  console.log(link);
});
