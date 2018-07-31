#!/usr/bin/env node

let body = process.argv[2];
let header = process.argv[3];
let files = process.argv[4];

let tab = '    ';
let append = files.split('\n').map(file => `\n${tab}"${file}",`).reduce((a, b) => `${a}${b}`, '');

console.log(body.replace(header, header + append));

