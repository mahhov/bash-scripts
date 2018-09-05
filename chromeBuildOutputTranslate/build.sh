export PATH=$PATH:~/.nvm/versions/node/v10.3.0/bin # this sucks but intellij is being a jerk

dir=$(dirname $(realpath "$0"))

buildName=`[ -z $1 ] && echo out/Default || echo $1`

pushd ~/workspace/chromium/src
unbuffer ~/workspace/depot_tools/ninja -C $buildName -j 1000 chrome | node $dir/translatePaths.js
status=${PIPESTATUS[0]}
popd

exit $status
