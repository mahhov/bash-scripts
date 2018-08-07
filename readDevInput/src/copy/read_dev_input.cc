#include "read_dev_input.h"

#include <fstream>
#include <iostream>
#include <sstream>
#include <algorithm>

// ReadDevInput

ReadDevInput::ReadDevInput(std::string fileName) : read() {
  std::ifstream inFile;
  inFile.open(fileName);
  if (!inFile)
    printf(
        "<<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> "
        "UNABLE TO OPEN FILE %s\n", fileName.c_str());

  std::string line;
  while (std::getline(inFile, line)) {
    std::istringstream iss(line);
    std::vector<Result> results = {};
    std::string word;
    std::string key;
    if (!(iss >> key))
      continue;
    while (iss >> word)
      results.push_back(Result(word));
    read.insert(std::make_pair(key, results));
  }

  inFile.close();
}

ReadDevInput::~ReadDevInput() {}

Result ReadDevInput::get(std::string key) {
  return get(key, 0);
}

Result ReadDevInput::get(std::string key, int index) {
  return index < read[key].size() ? read[key][index] : Result();
}

std::vector<Result> ReadDevInput::getList(std::string key) {
  return read[key];
}

void ReadDevInput::print() {
  for (auto& line : read) {
    printf("%s [%lu]\n", line.first.c_str(), line.second.size());
    for (auto& word : line.second)
      printf("  %s\n", word.value.c_str());
  }
}

// Result

Result::Result() : found(false), value("") {}

Result::Result(std::string value) : found(true), value(value) {}

std::string Result::get() {
  return value;
}

int Result::getInt() {
  return found ? std::stoi(value) : 0;
  // safe cast by checking if is int todo https://stackoverflow.com/questions/2844817/how-do-i-check-if-a-c-string-is-an-int
}

bool Result::getBool() {
  // todo to lower case
  return found && (value == "true" || value == "TRUE" || value == "True");
}
