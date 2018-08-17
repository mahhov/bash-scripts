# what's it do?

fuzy search file names

e.g. `yellow` could match with

`yellowBook.txt`

`yellowRock.txt`

`yell_only_when_you_need_to.txt`

`yex_lx_yx_lx_owx.txt`

etc.

### setup

1. sourcing

    in ur bash profile source the `findFile.sh` script
    ```
    . /usr/local/.../findFile/findFile.sh
    ```

1. optionally disable aliases

    on lines 29 & 30 of `findFile.sh`, u'll notice convenience aliases `ff` for `findFile2` and `cf` for `chromeFind`. disable or modify these as preferred.

1. chrome path

    modify the variable `chromeSrc` in `findFile.sh` (line 25) to your actual path

### usage

in ur terminal

`findFile2 myFuzzyFileName.txt` will search for `myFuzzyFileName.txt` in ur current dir

`findFile2 mfinam` will search for `mfinam` which will match `myFuzzyFileName.txt` if such a file exists

`findFile2 myDir mfinam` will search for `mfinam` in `myDir`

`chromeFind shortProvh` will search for `shortProvh` in your chrome dir

```sh
> chromeFind shortProvh
components/omnibox/browser/shortcuts_provider.h
components/omnibox/browser/shortcuts_provider_test_util.h
chrome/browser/ui/app_list/search/arc/arc_app_shortcuts_search_provider.h
chrome/browser/ui/app_list/search/settings_shortcut/settings_shortcut_provider.h
```

![screenshot](./screenshots/screenshot.png)
