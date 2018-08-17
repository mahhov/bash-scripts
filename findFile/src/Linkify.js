const ansiEscapes = require('ansi-escapes');

const dimStyle = '\033[2m';
const boldStyle = '\033[1m';
const normalStyle = '\033[0m';

let linkText = (localDir, file) => `${dimStyle}${localDir}/${normalStyle}${boldStyle}${file}${normalStyle}`;

let linkify = ({localDir, file, fullPath}) => {
  let text = linkText(localDir, file);
  return ansiEscapes.link(text, `file://${fullPath}/${file}`);
};

module.exports = linkify;
