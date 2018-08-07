#ifndef CHROMIUM_READ_DEV_INPUT_H
#define CHROMIUM_READ_DEV_INPUT_H

#include "base/base_export.h"

#include <map>
#include <string>
#include <vector>

class Result;

class BASE_EXPORT ReadDevInput {
 public:
  explicit ReadDevInput(std::string fileName);

  ~ReadDevInput();

  Result get(std::string key);

  Result get(std::string key, size_t index);

  std::vector<Result> getList(std::string key);

  void print();

 private:
  std::map<std::string, std::vector<Result>> read;
};

class BASE_EXPORT Result {
 public:
  Result();

  explicit Result(std::string value);

  bool found;
  std::string value;

  std::string get();

  int getInt();

  bool getBool();
};

#endif  // CHROMIUM_READ_DEV_INPUT_H
