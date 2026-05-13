const phrase = process.argv[2];
const shift = parseInt(process.argv[3]);

if (!phrase || isNaN(shift)) {
  console.log('Usage: node caesarCipher.js "your phrase" <shift>');
  process.exit(1);
}

function encryptChar(char, shift) {
  if (!/[a-zA-Z]/.test(char)) return char;

  const base = 97; // 'a'
  const letter = char.toLowerCase().charCodeAt(0) - base;
  const shifted = ((letter + shift) % 26 + 26) % 26;
  return String.fromCharCode(shifted + base);
}

const encrypted = phrase.split('').map(char => encryptChar(char, shift)).join('');
console.log(encrypted);
