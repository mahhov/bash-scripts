xdotool keyup super
xdotool key ctrl+alt+shift+c
chrome=/opt/google/chrome/chrome
codeSearchUrl='https://cs.chromium.org/search/?sq=package:chromium&ct=os&q='
query=`xclip -selection c -o`
$chrome $codeSearchUrl$query

