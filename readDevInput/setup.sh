src=~/workspace/chromium/src
cp src/* $src/base/files/
touch $src/read.txt
./appendBuildFile.js "$(cat $src/base/BUILD.gn)" "sources = [" "$(ls src)" > $src/base/BUILD.gn
