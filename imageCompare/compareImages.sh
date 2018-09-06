# `./compareImages base` will take base window image
# `./compareImages` will compare current window image with base window image
# `./compareImages diff` will diff (green / red) current window image with base window image
# `./compareImages kill` will kill all open comparisons
# adding `manual` before any command (e.g. `./compareImage manual base`) will allow u to manually select the window instead of automatically picking the focused window

dir=$(dirname "$0")
if [ "$1" == select ] ; then
  window=$(xdotool selectwindow)
  command=$2
else
  window=$(xdotool getwindowfocus)
  command=$1
fi

# base
if [ $command == base ] ; then
    import -window $window $dir/base.png

# diff
elif [ $command == diff ] ; then
    import -window $window $dir/temp.png
    convert \
        '(' $dir/temp.png -flatten -grayscale Rec709Luminance ')' \
        '(' $dir/base.png -flatten -grayscale Rec709Luminance ')' \
        '(' -clone 0-1 -compose darken -composite ')' \
        -channel RGB -combine $dir/display.png
    montage -tile x3 -geometry +0+0 $dir/base.png $dir/temp.png $dir/display.png $dir/concat.png
    display $dir/display.png

# kill
elif [ $command == kill ] ; then
    pkill -9 -f 'display.*/display.png'

# compare
else
    import -window $window $dir/temp.png
    compare -highlight-color gray $dir/base.png $dir/temp.png $dir/display.png
    montage -tile x3 -geometry +0+0 $dir/base.png $dir/temp.png $dir/display.png $dir/concat.png
    display $dir/display.png
fi
