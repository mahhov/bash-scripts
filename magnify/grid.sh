echo usage ./gridx.sh display.png 10 10 0 0 '#fff2'
echo usage ./gridx.sh imageFile deltaX deltaY offsetX offsetY color

width=`identify -format "%w" $1`
height=`identify -format "%h" $1`

deltaX=$2
deltaY=$3
offsetX=$4
offsetY=$5
color=$6

x=$offsetX
while [ $x -le $width ] ; do
  addString="line $x,0 $x,$height"
  drawString+=$addString
  x=$((x + deltaX))
done

y=$offsetY
while [ $y -le $height ] ; do
  addString="line 0,$y $width,$y"
  drawString+=$addString
  y=$((y + deltaY))
done

convert -fill "$color" -draw "$drawString" $1 $1
