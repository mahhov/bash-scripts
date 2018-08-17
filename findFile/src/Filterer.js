class Filterer {
  static filterText(text, filterText) {
    return Filterer.filterWords(Filterer.textToWords(text), filterText);
  }

  static textToWords(text) {
    return text.match(/[a-z]+|[A-Z][a-z]*|\d+|./g) || [];
  }

  static filterWords(textWords, filterText, textIndex = 0, textCharIndex = 0, filterIndex = 0) {
    if (filterIndex === filterText.length)
      return true;
    if (textIndex === textWords.length)
      return false;
    if (Filterer.filterWords(textWords, filterText, textIndex + 1, 0, filterIndex))
      return true;
    if (filterText[filterIndex].toLowerCase() !== textWords[textIndex][textCharIndex].toLowerCase())
      return false;
    if (++textCharIndex === textWords[textIndex].length) {
      textIndex++;
      textCharIndex = 0;
    }
    return Filterer.filterWords(textWords, filterText, textIndex, textCharIndex, filterIndex + 1);
  }
}

module.exports = Filterer;
