#!/usr/bin/env node

const readline = require('readline');

const srcDir = '/usr/local/google/home/manukh/workspace/chromium/src/';

const NORMAL = '\033[0m';
const COLORS = {
  red: '\033[1;31m',
  blue: '\033[1;34m',
  pink: '\033[1;35m',
  white: '\033[1;37m',
  ired: '\033[1;41m',
  iblue: '\033[1;44m',
  ipink: '\033[1;45m',
  iwhite: '\033[1;47m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  Object.entries(COLORS).forEach(([key, code]) =>
      line = line.replace(new RegExp(`^${key}\\b(.*)$`, 'g'), line => `${code}${line}${NORMAL}`));
  console.log(line);
});

