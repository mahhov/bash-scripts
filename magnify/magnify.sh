# ./magnify.sh
# ./magnify.sh window
# ./magnify.sh kill

dir=$(dirname "$0")

if [ "$1" == kill ] ; then
    pkill -9 -f "display $dir/display.png"

elif [ "$1" == window ] ; then
    window=$(xdotool getwindowfocus)
    import -window $window $dir/display.png
    display $dir/display.png &

elif [ "$1" == grid ] ; then
    window=$(xdotool getwindowfocus)
    import -window $window $dir/display.png
    $dir/grid.sh $dir/display.png 4 4 2 2 '#fff4'
    $dir/grid.sh $dir/display.png 4 4 0 0 '#fff2'
    display $dir/display.png &

else
    if [ -z "$1" ] ; then
      zoom=100%
    else
      zoom=$1
    fi
    scale=${zoom::-1}
    if [ -z "$2" ] ; then
      size=$((60000 / $scale))
    else
      size=$2
    fi

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

    left=$(clip $((x-size/2)) 0 $((width-size)))
    top=$(clip $((y-size/2)) 0 $((height-size)))

    import -window root -crop ${size}x$size+$left+$top $dir/display.png
    convert -sample $zoom $dir/display.png $dir/display.png

    display $dir/display.png &
fi
