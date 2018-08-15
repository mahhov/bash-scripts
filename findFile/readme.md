# what's it do?

fuzy search file names

e.g. `yellow` could match with

`yellowBook.txt`
`yellowRock.txt`
`yell_only_when_you_need_to.txt`
`yex_lx_yx_lx_owx.txt`
etc.

### setup

in ur bash profile

```
findFile() {
    find . | ~/personal/bashScripts/findFile/findFile.js $1
}
```

### usage

in ur terminal

`findFile myFuzzyFileName.txt`

or

`findFiel mFinam`
