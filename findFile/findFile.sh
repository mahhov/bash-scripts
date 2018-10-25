chromeSrcDir=/usr/local/google/home/manukh/workspace/chromium/src
findFileSrcDir=$(dirname "${BASH_SOURCE[0]}")/src

findFile() {
    if [ -z "$1" ]; then
        echo usage: [optional searchDir] [searchText]
        return;
    elif [ -z "$2" ]; then
        dir=`pwd`
        filter=$1
    else
        dir=`pwd`/$1
        filter=$2
    fi
    echo "searching for ($filter) in ($dir)"
    $findFileSrcDir/findFile2.js "$dir" "$filter"
}

chromeFind() {
    cd $chromeSrcDir &&
    find . -not -path './out/*' | $findFileSrcDir/findFile.js $chromeSrcDir "$1"
}

alias ff=findFile
alias cf=chromeFind
