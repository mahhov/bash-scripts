export PATH=$PATH:~/.nvm/versions/node/v10.3.0/bin

dir=$(dirname "$0")

pushd ~/workspace/chromium/src
unbuffer out/Default/chrome | $dir/translateRunColors.js
status=${PIPESTATUS[0]}
popd

exit $status

