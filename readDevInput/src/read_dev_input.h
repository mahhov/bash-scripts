#ifndef CHROMIUM_READ_DEV_INPUT_H
#define CHROMIUM_READ_DEV_INPUT_H

#include "base/base_export.h"

#include <map>
#include <string>
#include <vector>

class BASE_EXPORT ReadDevInput {
 public:
  explicit ReadDevInput(std::string fileName);

  ~ReadDevInput();

  std::string get(std::string key);

  std::string get(std::string key, int index);

  std::vector<std::string> getList(std::string key);

  void print();

 private:
  std::map<std::string, std::vector<std::string>> read;
};

#endif  // CHROMIUM_READ_DEV_INPUT_H
