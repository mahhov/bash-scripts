export PATH=$PATH:/usr/local/google/home/manukh/.nvm/versions/node/v10.3.0/bin # this sucks but intellij is being a jerk

dir=$(dirname "$0")
pushd /usr/local/google/home/manukh/workspace/chromium/src
/usr/local/google/home/manukh/workspace/depot_tools/ninja -C out/Default -j 1000 chrome | node $dir/translatePaths.js
popd
