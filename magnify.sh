ZOOM=200% # can be percent (e.g. 200%) or width (e.g. 2000)
SIZE=300;

dir=$(dirname "$0")

mouse=$(xdotool getmouselocation | tr ':' ' ')
screen=$(xdotool getdisplaygeometry)
x=$(echo $mouse | cut -d ' ' -f 2)
y=$(echo $mouse | cut -d ' ' -f 4)
width=$(echo $screen | cut -d ' ' -f 1)
height=$(echo $screen | cut -d ' ' -f 2)

clip() {
    value=$1
    min=$2
    max=$3
    value=$((value<min?min:value))
    value=$((value>max?max:value))
    echo $value
}

left=$(clip $((x-SIZE/2)) 0 $((width-SIZE)))
top=$(clip $((y-SIZE/2)) 0 $((height-SIZE)))

import -window root -crop ${SIZE}x$SIZE+$left+$top -resize $ZOOM $dir/temp.png
display $dir/temp.png &

