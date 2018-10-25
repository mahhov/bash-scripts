#!/usr/bin/env node

const readline = require('readline');

const NORMAL = '\033[0m';
const COLORS = {
  black: '\033[1;30m',
  red: '\033[1;31m',
  green: '\033[1;32m',
  yellow: '\033[1;33m',
  blue: '\033[1;34m',
  pink: '\033[1;35m',
  cyan: '\033[1;36m',
  white: '\033[1;37m',

  iblack: '\033[1;40m',
  ired: '\033[1;41m',
  igreen: '\033[1;42m',
  iyellow: '\033[1;43m',
  iblue: '\033[1;44m',
  ipink: '\033[1;45m',
  icyan: '\033[1;46m',
  iwhite: '\033[1;47m',

  lblack: '\033[1;90m',
  lred: '\033[1;91m',
  lgreen: '\033[1;92m',
  lyellow: '\033[1;93m',
  lblue: '\033[1;94m',
  lpink: '\033[1;95m',
  lcyan: '\033[1;96m',
  lwhite: '\033[1;97m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineNumber = 0;

rl.on('line', line => {
  line = line.replace(/^\[\d+:\d+:\d+\/\d+\.\d+:.*$/g, () => ``);
  if (!line)
    return;
  Object.entries(COLORS).forEach(([key, code]) =>
      line = line.replace(new RegExp(`^${key}\\b(.*)$`, 'g'), line => `${code}${line}${NORMAL}`));
  console.log(`${COLORS.icyan}${lineNumber++}:${NORMAL} ${line}`);
});
