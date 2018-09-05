# Image Compare

overlays 2 images and highlight differences.

## examples

top images r base images, middle images r the comparison images, and the bottom images r the overlays

![screenshot1](./screenshots/1.png)

![screenshot2](./screenshots/2.png)

![screenshot3](./screenshots/3.png)

![screenshot4](./screenshots/4.png)

![screenshot5](./screenshots/5.png)

![gif](./screenshots/imageCompare.gif)

## image names

the script creates 4 `png` files named:

- `base.png`, base image

- `temp.png`, comparison image

- `display.png`, overlay image

- `concat.png`, the 3 above concatenated as in the screenshots

## commands

- `compareImages.sh base` captures base image from current focused window

- `compareImages.sh` 1. captures comparison image, 2. compares captured comparison image with last captured base image to generate overlay image, 3. and displays overlay image. see the last screenshot for an example.

- `compareImages.sh diff` same as above, but uses green & red  to highlight removals & additions respectively. see the first 4 screenshots for examples.

- `compareImages.sh kill` kills all opened displays. useful when u find urself with 10+ overlay images open

## useful bindings

i've found the following keyboard shortcuts useful:

- `window + 1` to `path/imageCompare/compareImages.sh diff`

- `window + 2` to `path/imageCompare/compareImages.sh`

- `window + 3` to `path/imageCompare/compareImages.sh diff`

- ``window + ` `` to `path/imageCompare/compareImages.sh kill`
