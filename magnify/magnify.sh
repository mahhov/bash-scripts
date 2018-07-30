# ./magnify.sh
# ./magnify.sh window
# ./magnify.sh kill

ZOOM=100% # can be percent (e.g. 200%) or width (e.g. 2000)
SIZE=600;

dir=$(dirname "$0")

if [ "$1" == kill ] ; then
    pkill -9 -f "display $dir/display.png"

elif [ "$1" == window ] ; then
    window=$(xdotool getwindowfocus)
    import -window $window -resize $ZOOM $dir/display.png
    display $dir/display.png &
    
else
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

    import -window root -crop ${SIZE}x$SIZE+$left+$top -resize $ZOOM $dir/display.png
    display $dir/display.png &
fi

