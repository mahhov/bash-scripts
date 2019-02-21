#!/usr/bin/env node

const readline = require('readline');

const dir = `~/workspace/chromium/src`;

let blue = text => '\033[1;34m' + text + '\033[0m'; // blue

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let prompt = promptText => new Promise(resolve => rl.question(blue(promptText), resolve));

let main = async () => {
  let featureVariableName = await prompt('Feature variable name (e.g. kUIExperimentShowSuffixOnAllSearchSuggestions)? ');
  let featureName = await prompt('Feature name (recommend dropping "experiment") (e.g. OmniboxUIExperimentShowSuffixOnAllSearchSuggestions)? ');
  let featureNameSpaced = featureName.replace(/(?<![A-Z])[A-Z]|[A-Z](?![A-Z])/g, (cap, offset) => (offset ? ' ' : '') + cap); // maps: TheABCExperiment -> The ABC Experiment
  let featureNameDashed = featureNameSpaced.replace(/ /g, '-').toLowerCase();  // maps: The ABC Experiment -> the-abc-experiment
  let flagDescription = await prompt('Flag desscription? ');
  let flagOwners = await prompt('Flag owners (space separated) (e.g. chrome-omnibox-team@google.com)? ');
  let flagExpiryMilestone = await prompt('Flag expiry milestone (e.g. 80)? ');

  let aboutFlagsEntry = `
      {"${featureNameDashed}",
       flag_descriptions::k${featureName}Name,
       flag_descriptions::k${featureName}Description,
       kOsDesktop,
       FEATURE_VALUE_TYPE(omnibox::${featureVariableName})},
  `;

  let flagDescriptionsHeaderEntry = `
      extern const char k${featureName}Name[];
      extern const char k${featureName}Description[];
  `;

  let flagDescriptionsEntry = `
      const char k${featureName}Name[] =
        "${featureNameSpaced}";
      const char k${featureName}Description[] =
        "${flagDescription}";
  `;

  let flagMetadataJsonEntry = `
      {
        "name": "${featureNameDashed}",
        "owners": [ "${flagOwners.replace(/ /g, '", "')}" ],
        "expiry_milestone": ${flagExpiryMilestone}
      },
  `;

  console.log();
  console.log(blue('chrome/browser/about_flags.cc'), 'ordered contextually');
  console.log(aboutFlagsEntry);
  console.log(blue('chrome/browser/flag_descriptions.h'), 'ordered alphabetically');
  console.log(flagDescriptionsHeaderEntry);
  console.log(blue('chrome/browser/flag_descriptions.cc'), 'ordered alphabetically');
  console.log(flagDescriptionsEntry);
  console.log(blue('chrome/browser/flag-metadata.json'), 'ordered contextually');
  console.log(flagMetadataJsonEntry);
  console.log();

  console.log('dont forget to run:');
  console.log(blue('./genEnums.js'));
  console.log('suggested commit command:');
  console.log(blue(`cd ${dir}; git add . && git commit -m "flag for feature ${featureVariableName}"`));

  rl.close();
};

main();
