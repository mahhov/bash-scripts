#include "read_dev_input.h"

int main() {
  ReadDevInput readDevInput{"read.txt"};

  auto x = readDevInput.get("key", 0);
  printf("found %d\n", x.found);
  // printf("value %s.\n", x.value.c_str());
  // printf("int %d.\n", x.getInt());
  // printf("bool %d.\n", x.getBool());

  // printf("bool %d.\n", readDevInput.getList("elevationShadowMap_16")[2].getInt());

  return 0;
}

