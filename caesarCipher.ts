const phrase: string | undefined = process.argv[2];
const shift: number = parseInt(process.argv[3]);
const mode: string = process.argv[4]?.toLowerCase() ?? 'encrypt';

if (!phrase || isNaN(shift) || !['encrypt', 'decrypt'].includes(mode)) {
  console.log('Usage: ts-node caesarCipher.ts "your phrase" <shift> [encrypt|decrypt]');
  process.exit(1);
}

function encryptChar(char: string, shift: number): string {
  if (!/[a-zA-Z]/.test(char)) return char;

  const base = 97; // 'a'
  const letter = char.toLowerCase().charCodeAt(0) - base;
  const shifted = ((letter + shift) % 26 + 26) % 26;
  return String.fromCharCode(shifted + base);
}

const appliedShift = mode === 'decrypt' ? -shift : shift;
const result = phrase.split('').map(char => encryptChar(char, appliedShift)).join('');
console.log(result);

export {};
