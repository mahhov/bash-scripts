export PATH=$PATH:~/.nvm/versions/node/v10.3.0/bin

echo $1
echo $2

dir=$(dirname $(realpath "$0"))

pushd ~/workspace/chromium/src
unbuffer ~/workspace/depot_tools/ninja -C out/Default -j 1000 $1 | $dir/translatePaths.js
[[ ${PIPESTATUS[0]} -eq 0 ]] && (unbuffer out/Default/$1 --gtest_filter=$2 | $dir/translatePaths.js)
popd

exit 1
