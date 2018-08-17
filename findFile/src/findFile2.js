#!/usr/bin/env node

const {walk, walkBig} = require('file-walk-stream');
const Filterer = require('./Filterer');
const linkify = require('./Linkify');
const searchDir = process.argv[2];
const filterText = process.argv[3];

/*walk(searchDir)
  .filter(({localDir, file}) => Filterer.filterText(`${localDir}/${file}`, filterText))
  .map(linkify)
  .each(link => console.log(link));*/

walkBig(searchDir, (obj) => {
  if (!Filterer.filterText(`${obj.localDir}/${obj.file}`, filterText))
    return;
  let link = linkify(obj);
  console.log(link);
});

// this is nice in that it does not rely on `find`, but it's much slower than `findFile.js`
