type Move = 'rock' | 'paper' | 'scissors';

const choices: Move[] = ['rock', 'paper', 'scissors'];
const playerMove: string | undefined = process.argv[2];

if (!playerMove || !choices.includes(playerMove.toLowerCase() as Move)) {
  console.log('Usage: ts-node rockPaperScissors.ts <rock|paper|scissors>');
  process.exit(1);
}

const player = playerMove.toLowerCase() as Move;
const computer = choices[Math.floor(Math.random() * choices.length)];

let result: string;
if (player === computer) {
  result = "It's a draw!";
} else if (
  (player === 'rock'     && computer === 'scissors') ||
  (player === 'scissors' && computer === 'paper')    ||
  (player === 'paper'    && computer === 'rock')
) {
  result = 'You win!';
} else {
  result = 'You lose!';
}

console.log(`You chose ${player}. Computer chose ${computer}. ${result}`);

export {};
