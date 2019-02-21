# `chromium-clion-to-codeSearch.sh`

Given you're in CLion, opens the code at your cursor position in the chromium code browser, `https://cs.chromium.org/`.

- Takes advantage of CLion's ctrl+alt+shift+c shortcut (copy reference). Update line 2, if the shortcuts different.

# `chromium-codeSearch-to-clion.sh`

Given you're in chromium's online code browser, opens the code at your cursor position in CLion.

- Assumes chromium working dir `~/workspace/chromium`. Update line 22, if that's not the case.

# `google3-cider-to-clion.sh`

Given you're in google3's cider editor, opens the code at your cursor position in CLion.

- Assumes a CLion instance with title 'google3' is running. Update line 17, if that's not the case.
