#!/usr/bin/env node

const fs = require('fs').promises;
const axios = require('axios');
const childProcess = require('child_process');
const Stream = require('bs-better-stream');
const inputWords = process.argv.splice(2);

const setClipboard = contents =>
  childProcess.execSync(`echo '${contents}' | xclip -selection c -l 1`);

function* makeEnum() {
  let i = 0;
  while (true)
    yield i++;
}

const [HEADER, NUMBER, CUSTOM_NUMBER, ISSUE] = makeEnum();

let getTitle = async (issueNumber) =>
  (await axios.get(`https://bugs.chromium.org/p/chromium/issues/detail?id=${issueNumber}`))
    .data.match(/<span class="h3".*>(.*)<\/span>/)[1];

let isHeader = word => /^@/.test(word);
let isNumber = word => /^\d+$/.test(word);
let isCustomNumber = word => /^\d+ /.test(word);

let createHeader = header => ({type: HEADER, header: header.slice(1)});
let createNumber = number => ({type: NUMBER, number, title: getTitle(number)});
let createCustomNumber = numberAndTitle => {
  let [, number, title] = numberAndTitle.match(/^(\d{6}) ([\s\S]*)/);
  return {type: CUSTOM_NUMBER, number, title};
};
let createIssue = title => ({type: ISSUE, title});

let formatHeader = ({header}) => `${header}:`;
let formatNumber = ({number, title}) => `- Issue [#${number}](https://crbug.com/${number}): ${title}`;
let formatIssue = ({title}) => `- ${title}`;

Stream()
  .write(...inputWords)
  .branchMap(
    isHeader, createHeader,
    isNumber, createNumber,
    isCustomNumber, createCustomNumber,
    createIssue)
  .waitOnOrdered('title')
  .switchMap(line => line.type,
    HEADER, formatHeader,
    NUMBER, formatNumber,
    CUSTOM_NUMBER, formatNumber,
    ISSUE, formatIssue)
  .batch(inputWords.length)
  .map(lines => lines.reduce((a, b) => `${a}\n\n${b}`, ''))
  .each(a => console.log(a))
  .map(setClipboard)
  .wait()
  .each(() => console.log('\n\n-- copied to clipboard --'));
