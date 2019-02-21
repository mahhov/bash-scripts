windowName=`xdotool getactivewindow getwindowname`
if [[ $windowName = "" ]]; then
    echo good
elif MORE-TEST-COMMANDS; then
    echo not good
fi
