export PATH=$PATH:~/.nvm/versions/node/v10.3.0/bin # this sucks but intellij is being a jerk

dir=$(dirname $(realpath "$0"))

pushd ~/workspace/chromium/src
unbuffer ~/workspace/depot_tools/ninja -C out/Default -j 1000 chrome | node $dir/translatePaths.js
status=${PIPESTATUS[0]}
popd

exit $status
