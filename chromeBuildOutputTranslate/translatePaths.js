#!/usr/bin/env node

const readline = require('readline');
// const chalk = require('chalk'); // doens't work with intellij :(

const srcDir = '/usr/local/google/home/manukh/workspace/chromium/src/';  // intellij requries full paths

const normal = '\033[0m';
const bRed = '\033[1;31m';
const bold = '\033[1m';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
    let out = line
        .replace(/^~\/workspace\/goma\/gomacc .*$/g, () => ``)
        .replace(/\.\.\/\.\.\/(\S*):/g, (_, file) => `${srcDir}/${file}`)
        .replace(/^.*\berror\b.*$/g, line => `${bRed}${line}${normal}`)
        ;
    console.log(out);
})

// ../../components/omnibox/browser/autocomplete_input.h:239:33:
// usr/local/google/home/manukh/workspace/readFile/main.cpp:7:

