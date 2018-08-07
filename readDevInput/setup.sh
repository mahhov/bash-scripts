src=~/workspace/chromium/src

cp src/copy/* $src/base/files/
touch $src/read.txt

copyFiles=$(ls -p src/copy | grep -v /)
./appendBuildFile.js "$(cat $src/base/BUILD.gn)" "sources = [" "$copyFiles" > $src/base/BUILD.gn

echo '#include "base/files/read_dev_input.h"'
echo 'ReadDevInput x("read.txt");'
echo 'x.get("myKey").found;'
echo 'x.get("myKey").value;'
echo 'x.get("myKey", 0).get();'
echo 'x.get("myKey", 1).getInt();'
echo 'x.get("myKey", 2).getBool();'
echo 'x.getList("myKey")[2].getInt();'

