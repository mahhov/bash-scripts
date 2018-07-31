src=~/workspace/chromium/src
cp src/* $src/base/files/
touch $src/read.txt
./appendBuildFile.js "$(cat $src/base/BUILD.gn)" "sources = [" "$(ls src)" > $src/base/BUILD.gn

echo '#include "base/files/read_dev_input.h"'
echo 'ReadDevInput x("read.txt");'
echo 'x.get("myKey");'
echo 'x.get("myKey", 0);'
echo 'x.getList("myKey")[0];'

