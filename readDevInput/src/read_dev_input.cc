#include "read_dev_input.h"

#include <fstream>
#include <iostream>
#include <sstream>

ReadDevInput::ReadDevInput(std::string fileName) : read() {
  std::ifstream inFile;
  inFile.open("read.txt");
  if (!inFile)
    printf(
        "<<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> <<>> "
        "UNABLE TO OPEN FILE\n");

  std::string line;
  while (std::getline(inFile, line)) {
    std::istringstream iss(line);
    std::vector<std::string> readLine = {};
    std::string word;
    std::string key;
    if (!(iss >> key))
      continue;
    while (iss >> word)
      readLine.push_back(word);
    read.insert(std::make_pair(key, readLine));
  }

  inFile.close();
}

ReadDevInput::~ReadDevInput() {}

std::string ReadDevInput::get(std::string key) {
  return read[key][0];
}

std::string ReadDevInput::get(std::string key, int index) {
  return read[key][index];
}

std::vector<std::string> ReadDevInput::getList(std::string key) {
  return read[key];
}

void ReadDevInput::print() {
  for (auto& line : read) {
    printf("%s [%lu]\n", line.first.c_str(), line.second.size());
    for (auto& value : line.second)
      printf("  %s\n", value.c_str());
  }
}
