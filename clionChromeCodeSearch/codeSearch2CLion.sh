key() {
  xdotool key --clearmodifiers $1
}

type() {
  xdotool type --clearmodifiers $1
}

xdotool keyup shift
xdotool keyup super
xdotool keyup f

key l
key p
key ctrl+c
file=`xclip -o`
key r
key ctrl+c
key Escape
link=`xclip -o`
line=`echo $link | sed -r 's/.*l=([0-9]+)&.*/\1/'`
xdotool windowactivate --sync `xdotool search --name 'chromium \[\~\/workspace\/chromium'`
key ctrl+shift+o
echo $file:$line | xclip -selection c
key ctrl+v
