#!/usr/bin/env node

const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

const dir = `~/workspace/chromium/src`;
const ninja = '/usr/local/google/home/manukh/workspace/depot_tools/ninja';
const testCommand = `${ninja} -C out/Default -j 1000 unit_tests && out/Default/unit_tests --gtest_filter=AboutFlagsHistogramTest.CheckHistograms`;
const cmd = `cd ${dir}; ${testCommand}`; //${testCommand}`;

let blue = text => '\033[1;34m' + text + '\033[0m'; // blue

let execTry = comomand => {
  try {
    return {out: execSync(comomand, {stdio: 'pipe'}).toString()};
  } catch (execOutput) {
    return {
      out: execOutput.stdout && execOutput.stdout.toString(),
      error: execOutput.stderr && execOutput.stderr.toString(),
    };
  }
};

let testOutput = execTry(cmd);
let cleanedTestOutput = testOutput.out.split('\n').filter(a => a.match('<int')).map(a => a.trim());
console.log(cleanedTestOutput.join('\n'));
console.log('dont forget to run:');
console.log(blue(`python ${dir}/tools/metrics/histograms/pretty_print.py`));
console.log(blue(`python ${dir}/tools/metrics/histograms/validate_format.py`));
