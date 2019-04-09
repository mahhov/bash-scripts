#!/usr/bin/env node

const child_process= require('child_process');
const fs = require('fs');

let chromePath = '/usr/local/google/home/manukh/workspace/chromium';
let cmakePath = `${chromePath}/CMakeLists.txt`;
let includedDirectories = ['chrome', 'components', 'ui'];
let listChromeFilesCommand = `cd ${chromePath}; find ${includedDirectories.map(a => `src/${a}`).join(' ')} -type f \\( -name "*.cc" -or -name "*.h" \\)`;
let chromeFiles = child_process.execSync(listChromeFilesCommand).toString();
let output = `
cmake_minimum_required(VERSION 3.10)
project(chromium)

set(CMAKE_CXX_STANDARD 14)

set(CMAKE_BUILD_TYPE Debug)

include_directories(\${CMAKE_CURRENT_SOURCE_DIR}/src)

set(GTEST_SOURCE_DIR /usr/local/google/home/manukh/workspace/googletest/googletest)
include_directories(\${GTEST_SOURCE_DIR}/include \${GTEST_SOURCE_DIR})

set(SOURCE_FILES
${chromeFiles}
)

add_executable(chromium \${SOURCE_FILES})

add_executable(tests \${SOURCE_FILES})

target_link_libraries(tests gtest gtest_main)
`;

fs.writeFileSync(cmakePath, output);
console.log('done');
