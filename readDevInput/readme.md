### about

read constants from a txt file at run time to avoid having to rebuild & rerun chrome for every tiny change (e.g. comparing 8px and 7px left insets).

### demo gif

![demo gif](./screenshots/demo.gif)

### setup gif

![setup gif](./screenshots/setup.gif)

### setup

1. run the `setup.sh` script

2. add `#include "base/files/read_dev_input.h"` to the appropriate chrome source files

3. add `ReadDevInput x("read.txt");` to the appropriate scope

4. modify the `read.txt` file created in ur `src` directory. see below for what `read.txt` should look like

5. see api below for what `x` can do

### example `read.txt`

`read.txt` should look like a list of keys and values delineated by spaces. The first workd per line is the key, the remaining words are the values associated with that key.

```
leftAndRightPadding 20 19
colorRGB 10 255 250
showShadow true
string yep
```

### api

- `x.get("myKey").found`

    `bool` indicating if `read.txt` includes `myKey`

- `x.get("myKey").value`

    `string` representation of 1st value of `myKey`

- `x.get("myKey", i).get()`

    `string` representation of `i`th value of `myKey`

- `x.get("myKey", i).getInt()`

    `int` representation of `i`th value of `myKey`

- `x.get("myKey", i).getBool()`

    `bool` representation of `i`th value of `myKey`

- `x.getList("myKey")`

    vector of value objects with the `get`, `getInt`, and `getBool` methods described above

- `x.getList("myKey")[i].getInt()`

    alias for `x.get("myKey", i).getInt()`
