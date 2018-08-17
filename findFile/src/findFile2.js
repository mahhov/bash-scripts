#!/usr/bin/env node

// ./src/findFile2.js /usr/local/google/home/manukh/workspace/chromium/src shoprov

const ansiEscapes = require('ansi-escapes');
const {walk} = require('file-walk-stream');
const Filterer = require('./Filterer');
const searchDir = process.argv[2];
const filterText = process.argv[3];

const dimStyle = '\033[2m';
const boldStyle = '\033[1m';
const normalStyle = '\033[0m';

let linkText = (localDir, file) => `${dimStyle}${localDir}/${normalStyle}${boldStyle}${file}${normalStyle}`;

let linkify = ({localDir, file, fullPath}) => {
  let text = linkText(localDir, file);
  return ansiEscapes.link(text, `file://${fullPath}/${file}`);
};

walk(searchDir)
  .filter(({localDir, file}) => Filterer.filterText(`${localDir}/${file}`, filterText))
  .map(linkify)
  .each(link => console.log(link));
