import * as readline from 'readline';

type Move = 'rock' | 'paper' | 'scissors';

const choices: Move[] = ['rock', 'paper', 'scissors'];

type TransitionMatrix = Record<Move, Record<Move, number>>;

const counters: Record<Move, Move> = {
  rock: 'paper',
  paper: 'scissors',
  scissors: 'rock',
};

function isMove(value: string): value is Move {
  return (choices as string[]).includes(value);
}

function createMatrix(): TransitionMatrix {
  return {
    rock:     { rock: 0, paper: 0, scissors: 0 },
    paper:    { rock: 0, paper: 0, scissors: 0 },
    scissors: { rock: 0, paper: 0, scissors: 0 },
  };
}

function computerMove(matrix: TransitionMatrix, lastPlayerMove: Move | null): Move {
  if (!lastPlayerMove) {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  const row = matrix[lastPlayerMove];
  const total = Object.values(row).reduce((a, b) => a + b, 0);

  if (total === 0) {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // predict the most likely next move and counter it
  const predicted = (Object.entries(row) as [Move, number][])
    .reduce((best, curr) => (curr[1] > best[1] ? curr : best))[0];

  return counters[predicted];
}

function getResult(player: Move, computer: Move): 'win' | 'lose' | 'draw' {
  if (player === computer) return 'draw';
  if (
    (player === 'rock'     && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper')    ||
    (player === 'paper'    && computer === 'rock')
  ) return 'win';
  return 'lose';
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q: string) => new Promise<string>(resolve => rl.question(q, resolve));

  const matrix = createMatrix();
  let lastPlayerMove: Move | null = null;
  let wins = 0, losses = 0, draws = 0;

  console.log('Rock Paper Scissors — the computer learns your patterns.');
  console.log('Type "quit" to exit.\n');

  while (true) {
    const input = await ask('Your move (rock/paper/scissors): ');

    if (input.toLowerCase() === 'quit') break;

    const normalized = input.toLowerCase();

    if (!isMove(normalized)) {
      console.log(`Invalid move: "${input}". Choose one of: ${choices.join(', ')}\n`);
      continue;
    }

    const player = normalized;
    const computer = computerMove(matrix, lastPlayerMove);

    // update matrix: after playing lastPlayerMove, player played `player`
    if (lastPlayerMove) {
      matrix[lastPlayerMove][player]++;
    }

    const result = getResult(player, computer);
    if (result === 'win')  wins++;
    if (result === 'lose') losses++;
    if (result === 'draw') draws++;

    const resultText = result === 'win' ? 'You win!' : result === 'lose' ? 'You lose!' : "Draw!";
    console.log(`You: ${player} | Computer: ${computer} | ${resultText}`);
    console.log(`Score — W:${wins} L:${losses} D:${draws}\n`);

    lastPlayerMove = player;
  }

  const total = wins + losses + draws;
  if (total > 0) {
    console.log(`\nFinal: ${wins}W / ${losses}L / ${draws}D`);
    console.log(`Win rate: ${((wins / total) * 100).toFixed(1)}%`);
    console.log('\nTransition matrix (what you played after each move):');
    for (const from of choices) {
      const row = matrix[from];
      const entries = choices.map(to => `${to}:${row[to]}`).join('  ');
      console.log(`  after ${from.padEnd(8)} → ${entries}`);
    }
  }

  rl.close();
}

main();
