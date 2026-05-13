const choices = ['rock', 'paper', 'scissors'];
const playerMove = process.argv[2];

if (!playerMove || !choices.includes(playerMove.toLowerCase())) {
  console.log('Usage: node rockPaperScissors.js <rock|paper|scissors>');
  process.exit(1);
}

const player = playerMove.toLowerCase();
const computer = choices[Math.floor(Math.random() * choices.length)];

let result;
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
