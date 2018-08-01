# output transformations 

## Intro

This serves 2 purposes:

1. slightly modify the ninja build output to allow clion interpretation

1. slightly modify the chrome output to make debug output easier to identify

## build.sh

`./build.sh` will simply pipe the ninja build output to `translatePaths.js` which will in turn do 3 things:

1. will remove goma output (lines which begin with `~/workspace/goma/gomacc`) to avoid cluttering the output

1. will replace relative file paths with absolute file paths to allow clion (and other ide's) to link the files.

1. will print error messages with bold red styling. ninja already seems to do this by default in certain terminals, but whatever means it usees isn't compatible with clion's terminal, so we instead use bash coloring (e.g. `\033[1;31m`)    

#### normal

![screenshot without transformation](./screenshots/build-untransformed.png)

#### with transformations

![screenshot with transformation](./screenshots/build-transformed.png)

## run.sh

`run.sh` will simply pipe the output of running the built chrome executable to `translateRunColors.js` which will in turn style all output that is prefixed by a supported style name:

- `red`
- `blue`
- `pink`
- `white`
- `ired`
- `iblue`
- `ipink`
- `iwhite`

#### usage example

`printf("iwhite the unicorn hid the elephant's rainbow under the moon's flower\n");`

#### normal 1

![screenshot without transformation 1](./screenshots/run-untransformed.png)

#### with transformations 1

![screenshot with transformation 1](./screenshots/run-transformed.png)

#### normal 2

![screenshot without transformation 2](./screenshots/run-untransformed-2.png)

#### with transformations 2

![screenshot with transformation 2](./screenshots/run-transformed-2.png)

## terminal

these scripts work fine in terminal as well. If you're primary use case is the terminal, you may want to modify `translatePaths.js` to output terminal-compatible links instead of ide-compatible links. Whereas ide's desire `/absolute/path/src/my_c_file.c:line#`, 
terminals desire `file//...` with no appended line #