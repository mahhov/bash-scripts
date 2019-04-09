key() {
  xdotool key --clearmodifiers $1
}

type() {
  xdotool type --clearmodifiers $1
}

xdotool keyup ctrl
xdotool keyup super
xdotool keyup f

key ctrl+shift+p
type 'filesystem'
key Return
file=`xsel -ob`
if [[ $file == *.java ]]; then
  idea $file
else
  clion $file
fi
xdotool windowactivate --sync `xdotool search --name 'google3 \[\/google\/src'`
