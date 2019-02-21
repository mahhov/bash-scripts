# chromium flag gen

Given a chromium base feature, generates the corresponding flag code.

## example

![example](./screenshots/example.png)

## transcript of screenshot

```bash
$ node ./index.js
Feature variable name (e.g. kUIExperimentShowSuffixOnAllSearchSuggestions)? kUIExperimentBlueTitlesAndGrayUrlsOnPageSuggestions
Feature name (recommend dropping "experiment") (e.g. OmniboxUIExperimentShowSuffixOnAllSearchSuggestions)? OmniboxUIBlueTitlesAndGrayUrlsOnPageSuggestions
Flag desscription? Displays navigation suggestions with blue titles and gray URLs.
Flag owners (space separated) (e.g. chrome-omnibox-team@google.com)? tommycli chrome-omnibox-team@google.com
Flag expiry milestone (e.g. 80)? 80

chrome/browser/about_flags.cc

     {"omnibox-ui-blue-titles-and-gray-urls-on-page-suggestions",
      flag_descriptions::kOmniboxUIBlueTitlesAndGrayUrlsOnPageSuggestionsName,
      flag_descriptions::kOmniboxUIBlueTitlesAndGrayUrlsOnPageSuggestionsDescription,
      kOsDesktop,
      FEATURE_VALUE_TYPE(omnibox::kUIExperimentBlueTitlesAndGrayUrlsOnPageSuggestions)},

chrome/browser/flag_descriptions.h

     extern const char kOmniboxUIBlueTitlesAndGrayUrlsOnPageSuggestionsName[];
     extern const char kOmniboxUIBlueTitlesAndGrayUrlsOnPageSuggestionsDescription[];

chrome/browser/flag_descriptions.cc

     const char kOmniboxUIBlueTitlesAndGrayUrlsOnPageSuggestionsName[] =
       "Omnibox UI Blue Titles And Gray Urls On Page Suggestions";
     const char kOmniboxUIBlueTitlesAndGrayUrlsOnPageSuggestionsDescription[] =
       "Displays navigation suggestions with blue titles and gray URLs.";

chrome/browser/flag-metadata.json

     {
       "name": "omnibox-ui-blue-titles-and-gray-urls-on-page-suggestions",
       "owners": [ "tommycli", "chrome-omnibox-team@google.com" ],
       "expiry_milestone": 80
     },
```
