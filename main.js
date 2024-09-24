const Game = require("./game");

const moves = process.argv.slice(2);

if (
  moves.length % 2 === 0 ||
  moves.length < 3 ||
  new Set(moves).size !== moves.length
) {
  console.error(
    "Please provide an odd number of at least 3 non-repeating moves."
  );
  console.error("Example: node main.js rock paper scissors");
  process.exit(1);
}

const game = new Game(moves);
game.generateComputerMove();
game.play();
