import * as readline from 'readline';
import chalk from 'chalk';

type Move = 'rock' | 'paper' | 'scissors';

const choices: Move[] = ['rock', 'paper', 'scissors'];

type TransitionMatrix = Record<Move, Record<Move, number>>;

const counters: Record<Move, Move> = {
  rock: 'paper',
  paper: 'scissors',
  scissors: 'rock',
};

const aliases: Record<string, Move> = { r: 'rock', p: 'paper', s: 'scissors' };

function normalizeMove(value: string): Move | null {
  if (isMove(value)) return value;
  return aliases[value] ?? null;
}

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

function colorResult(result: 'win' | 'lose' | 'draw'): string {
  if (result === 'win')  return chalk.green('You win!');
  if (result === 'lose') return chalk.red('You lose!');
  return chalk.yellow('Draw!');
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q: string) => new Promise<string>(resolve => rl.question(q, resolve));

  const matrix = createMatrix();
  let lastPlayerMove: Move | null = null;
  let wins = 0, losses = 0, draws = 0;

  console.log(chalk.bold('Rock Paper Scissors') + chalk.dim(' — the computer learns your patterns.'));
  console.log(chalk.dim('Type "quit" to exit.\n'));

  while (true) {
    const input = await ask('Your move (rock/paper/scissors or r/p/s): ');

    if (input.trim().toLowerCase() === 'quit') break;

    const normalized = input.trim().toLowerCase();
    const player = normalizeMove(normalized);

    if (!player) {
      console.log(chalk.red(`Invalid move: "${input}".`) + ` Choose one of: ${choices.join(', ')} (or r/p/s)\n`);
      continue;
    }
    const computer = computerMove(matrix, lastPlayerMove);

    // update matrix: after playing lastPlayerMove, player played `player`
    if (lastPlayerMove) {
      matrix[lastPlayerMove][player]++;
    }

    const result = getResult(player, computer);
    if (result === 'win')  wins++;
    if (result === 'lose') losses++;
    if (result === 'draw') draws++;

    console.log(`You: ${chalk.cyan(player)} | Computer: ${chalk.magenta(computer)} | ${colorResult(result)}`);
    console.log(chalk.dim(`Score — W:${wins} L:${losses} D:${draws}\n`));

    lastPlayerMove = player;
  }

  const total = wins + losses + draws;
  if (total > 0) {
    console.log(chalk.bold(`\nFinal: ${wins}W / ${losses}L / ${draws}D`));
    console.log(`Win rate: ${chalk.yellow(((wins / total) * 100).toFixed(1) + '%')}`);
    console.log(chalk.dim('\nTransition matrix (what you played after each move):'));
    for (const from of choices) {
      const row = matrix[from];
      const entries = choices.map(to => `${to}:${row[to]}`).join('  ');
      console.log(chalk.dim(`  after ${from.padEnd(8)} → ${entries}`));
    }
  }

  rl.close();
}

main();
