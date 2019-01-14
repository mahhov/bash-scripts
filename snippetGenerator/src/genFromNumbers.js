#!/usr/bin/env node

const fs = require('fs').promises;
const axios = require('axios');
const childProcess = require('child_process');
const Stream = require('bs-better-stream');
const inputWords = process.argv.splice(2);

let headers = {};
try {
  headers = require('../headers.json');
  console.log('headers loaded');
} catch (e) {
  console.log('no headers loaded');
}

const setClipboard = contents =>
  childProcess.execSync(`echo '${contents}' | xclip -selection c -l 1`);

function* makeEnum() {
  let i = 0;
  while (true)
    yield i++;
}

const [HEADER, ISSUE, CUSTOM_ISSUE, REVIEW, CUSTOM_REVIEW, CUSTOM] = makeEnum();

let getIssueTitle = async (issueNumber) => {
  let response = (await axios.get(`https://bugs.chromium.org/p/chromium/issues/detail?id=${issueNumber}`, headers)).data;
  if (!response.includes('<title>Sign in - Google Accounts</title>'))
    return response.match(/<span class="h3".*>(.*)<\/span>/)[1];
  console.log(`-- unable to fetch title for issue ${issueNumber}, missing authentication, it may be a 'Restricted' issue, try setting a cookie --`);
  return issueNumber
};

let getReviewTitle = async (reviewNumber) => {
  let response = (await axios.get(`https://chromium-review.googlesource.com/changes/chromium%2Fsrc~${reviewNumber}/detail`)).data;
  let json = JSON.parse(response.substring(")]}'".length));
  return json.subject;
};

let isHeader = word => /^@/.test(word);
let isIssue = word => /^\d+$/.test(word);
let isCustomIssue = word => /^\d+ /.test(word);
let isReview = word => /^r\d+$/.test(word);
let isCustomReview = word => /^r\d+ /.test(word);

let createHeader = header => ({type: HEADER, header: header.slice(1)});
let createIssue = number => ({type: ISSUE, number, title: getIssueTitle(number)});
let createCustomIssue = numberAndTitle => {
  let [, number, title] = numberAndTitle.match(/^(\d{6}) ([\s\S]*)/);
  return {type: CUSTOM_ISSUE, number, title};
};
let createReview = number => {
  number = number.substring(1);
  return {type: REVIEW, number, title: getReviewTitle(number)};
};
let createCustomReview = numberAndTitle => {
  let [, number, title] = numberAndTitle.match(/^r(\d{7}) ([\s\S]*)/);
  return {type: CUSTOM_REVIEW, number, title};
};
let createCustom = title => ({type: CUSTOM, title});

let formatHeader = ({header}) => `${header}:`;
let formatIssue = ({number, title}) => `- Issue [#${number}](crbug.com/${number}): ${title}`;
let formatReview = ({number, title}) => `- Review [#${number}](crrev.com/c/${number}): ${title}`;
let formatCustom = ({title}) => `- ${title}`;

Stream()
  .write(...inputWords)
  .branchMap(
    isHeader, createHeader,
    isIssue, createIssue,
    isCustomIssue, createCustomIssue,
    isReview, createReview,
    isCustomReview, createCustomReview,
    createCustom)
  .waitOnOrdered('title')
  .switchMap(line => line.type,
    HEADER, formatHeader,
    ISSUE, formatIssue,
    CUSTOM_ISSUE, formatIssue,
    REVIEW, formatReview,
    CUSTOM_REVIEW, formatReview,
    CUSTOM, formatCustom)
  .batch(inputWords.length)
  .map(lines => lines.reduce((a, b) => `${a}\n\n${b}`, ''))
  .each(a => console.log(a))
  .map(setClipboard)
  .wait()
  .each(() => console.log('\n\n-- copied to clipboard --'));
