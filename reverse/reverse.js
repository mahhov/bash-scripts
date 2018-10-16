#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = [];

rl.on('line', lines.push.bind(lines));

rl.on('close', () => console.log(lines.reverse().reduce((a, b) => `${a}\n${b}`, '')));
