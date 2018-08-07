#include "read_dev_input.h"

int main() {
  ReadDevInput readDevInput{"read.txt"};

  auto x = readDevInput.getList("key");
  printf("found %d\n", x[10].found);
  printf("value %s.\n", x[10].value.c_str());
  printf("int %d.\n", x[10].getInt());
  printf("bool %d.\n", x[10].getBool());

  return 0;
}

