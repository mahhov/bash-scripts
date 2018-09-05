export PATH=$PATH:~/.nvm/versions/node/v10.3.0/bin

dir=$(dirname $(realpath "$0"))

buildName=`[ -z $1 ] && echo out/Default || echo $1`

pushd ~/workspace/chromium/src
unbuffer $buildName/chrome | $dir/translateRunColors.js
status=${PIPESTATUS[0]}
popd

exit $status

