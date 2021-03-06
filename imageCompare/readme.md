# Image Compare

overlays 2 images and highlights differences.

## examples

### green / red highlights

![gif 1](./screenshots/imageCompare1.gif)

![gif 2](./screenshots/imageCompare2.gif)

![gif 3](./screenshots/imageCompare3.gif)

![gif 4](./screenshots/imageCompare4.gif)

### gray highlights

`comareImage.sh`

![gif 5](./screenshots/imageCompare5.gif)

### command line

![gif cli](./screenshots/imageCompareCli.gif)

# screenshots

![screenshot1](./screenshots/1.png)

![screenshot2](./screenshots/2.png)

![screenshot3](./screenshots/3.png)

![screenshot4](./screenshots/4.png)

![screenshot5](./screenshots/5.png)

![screenshot6](./screenshots/6.png)

## image names

the script can create 4 `png` files named:

- `base.png`, base image

- `temp.png`, comparison image

- `display.png`, overlay image

- `concat.png`, the 3 above concatenated as in the screenshots above

## commands

- `compareImages.sh base` captures base image from currently focused window

- `compareImages.sh` 1. captures comparison image from currently focused window, 2. compares captured comparison image with last captured base image to generate the overlay image, 3. and displays the overlay image.

- `compareImages.sh diff` same as above, but uses green & red to highlight removals & additions respectively. see the first 4 screenshots for examples.

- `compareImages.sh kill` kills all opened displays. useful when u find urself with 10+ overlay images open

- adding `select` as the first argument (e.g. `compareImages.sh select base`) will allow u to select the window to capture instead of automatically using the focused window, particularly useful for running from command line.

## useful bindings

i've found the following keyboard shortcuts useful:

- `window + 1` to `path/imageCompare/compareImages.sh base`

- `window + 2` to `path/imageCompare/compareImages.sh`

- `window + 3` to `path/imageCompare/compareImages.sh diff`

- ``window + ` `` to `path/imageCompare/compareImages.sh kill`

## non-linux

the script builds upon the `MagickImage` command line tools, which are cross platform but may require some installation on other os's.
