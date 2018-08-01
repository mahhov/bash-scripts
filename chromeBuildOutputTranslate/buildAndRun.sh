export PATH=$PATH:~/.nvm/versions/node/v10.3.0/bin

dir=$(dirname $(realpath "$0"))

pushd ~/workspace/chromium/src
unbuffer ~/workspace/depot_tools/ninja -C out/Default -j 1000 chrome | $dir/translatePaths.js 
[[ ${PIPESTATUS[0]} -eq 0 ]] && (unbuffer out/Default/chrome | $dir/translateRunColors.js)
popd

