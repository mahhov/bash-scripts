#!/usr/bin/env node

const file = 'tempSnippet.txt';
const childProcess = require('child_process');
const fs = require('fs');
const axios = require('axios');

const writeUserFile = file =>
  childProcess.exec(`gedit ${file}`);

const waitForInput = () =>
  new Promise(resolve =>
    process.stdin.once('data', resolve));

const readUserFile = file =>
  fs.readFileSync(file, 'utf8');

const processSnippet = async (string) => {
  let titles = [];
  let r = /\[(\d+)\].*\!.{3}/g;
  while (m = r.exec(string))
    titles.push(getTitle(m[1]));
  titles = await Promise.all(titles);

  return string
    .replace(/(\[\d+\].*)\!.{3}/g, (_, prefix) => `${prefix}${titles.shift()}`)
    .replace(/\[(\d+)\]/g, (_, number) =>
      `[#${number}](https://crbug.com/${number})`)
}

const getTitle = async (issueNumber) =>
  (await axios.get(`https://bugs.chromium.org/p/chromium/issues/detail?id=${issueNumber}`))
    .data.match(/<span class="h3".*>(.*)<\/span>/)[1];

const setClipboard = contents =>
  childProcess.execSync(`echo '${contents}' | xclip -selection c -l 1`);

const main = async () => {
  writeUserFile(file);
  console.log('press enter to continue');
  await waitForInput();
  let input = readUserFile(file);
  let output = await processSnippet(input);
  console.log(output);
  setClipboard(output);
  console.log('-- copied to clipboard --');
  process.exit(1);
};

main();
