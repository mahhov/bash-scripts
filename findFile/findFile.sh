findFileSrcDir() {
    echo $(dirname "${BASH_SOURCE[0]}")/src
}

#findFile() {
#    find . -not -path './out/*' | `findFileSrcDir`/findFile.js $1
#}

findFile2() {
    if [ -z $1 ]; then
        echo usage: [optional searchDir] [searchText]
        return;
    elif [ -z $2 ]; then
        dir=.
        filter=$1
    else
        dir=$1
        filter=$2
    fi
    echo "searching for ($filter) in ($dir)"
    `findFileSrcDir`/findFile2.js $dir $filter
}

chromeFind() {
    chromeSrc=/usr/local/google/home/manukh/workspace/chromium/src
    `findFileSrcDir`/findFile2.js $chromeSrc $1
}

alias ff=findFile2
alias cf=chromeFind

