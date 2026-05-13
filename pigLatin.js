function isVowel(char) {
  return 'aeiou'.includes(char.toLowerCase());
}

function translateWord(word) {
  if (!/[a-zA-Z]/.test(word)) return word;

  const isCapitalized = word[0] !== word[0].toLowerCase();
  const lower = word.toLowerCase();

  let leadingConsonants = 0;
  while (leadingConsonants < lower.length && !isVowel(lower[leadingConsonants])) {
    leadingConsonants++;
  }

  let translated;
  if (leadingConsonants === 0) {
    translated = lower + 'way';
  } else {
    translated = lower.slice(leadingConsonants) + lower.slice(0, leadingConsonants) + 'ay';
  }

  if (isCapitalized) {
    translated = translated[0].toUpperCase() + translated.slice(1);
  }

  return translated;
}

const phrase = process.argv[2];

if (!phrase) {
  console.log('Usage: node pigLatin.js "Your phrase here"');
  process.exit(1);
}

const translated = phrase.split(' ').map(translateWord).join(' ');
console.log(translated);
