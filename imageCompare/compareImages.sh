# `./compareImages base` will take base window image
# `./compareImages` will compare current window image with base window image
# `./compareImages diff` will diff (green / red) current window image with base window image
# `./compareImages kill` will kill all open comparisons

dir=$(dirname "$0")
window=$(xdotool getwindowfocus)

# base
if [ "$1" == base ] ; then
    import -window $window $dir/base.png
    
# diff
elif [ "$1" == diff ] ; then
    import -window $window $dir/temp.png
    convert \
        '(' $dir/temp.png -flatten -grayscale Rec709Luminance ')' \
        '(' $dir/base.png -flatten -grayscale Rec709Luminance ')' \
        '(' -clone 0-1 -compose darken -composite ')' \
        -channel RGB -combine $dir/display.png
    display $dir/display.png

# kill
elif [ "$1" == kill ] ; then
    pkill -9 -f "display $dir/display.png"

# compare
else
    import -window $window $dir/temp.png
    compare -highlight-color gray $dir/base.png $dir/temp.png $dir/display.png 
    display $dir/display.png
fi

