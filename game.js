const readline = require("readline");
const HMACUtils = require("./hmacUtils");
const GameRules = require("./gameRules");

class Game {
  constructor(moves) {
    this.moves = moves;
    this.rules = new GameRules(moves);
    this.computerMove = null;
    this.hmac = null;
    this.key = null;
  }

  generateComputerMove() {
    this.computerMove =
      this.moves[Math.floor(Math.random() * this.moves.length)];
    this.key = HMACUtils.generateKey();
    this.hmac = HMACUtils.calculateHMAC(this.key, this.computerMove);
  }

  displayMoves() {
    console.log(`HMAC: ${this.hmac}`);
    console.log("Available moves:");
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - Exit");
    console.log("? - Help");
  }

  play() {
    this.displayMoves();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askForInput = () => {
      rl.question("Enter your move: ", (answer) => {
        if (answer === "0") {
          rl.close();
          return;
        } else if (answer === "?") {
          this.printHelp();
          askForInput();
        } else if (Number(answer) >= 1 && Number(answer) <= this.moves.length) {
          const userMove = this.moves[Number(answer) - 1];
          console.log(`Your move: ${userMove}`);
          console.log(`Computer move: ${this.computerMove}`);
          const result = this.rules.getWinner(
            this.moves.indexOf(userMove),
            this.moves.indexOf(this.computerMove)
          );
          console.log(`You ${result}!`);
          console.log(`HMAC key: ${this.key}`);
          rl.close();
        } else {
          console.log("Invalid input. Please enter a valid number.");
          askForInput();
        }
      });
    };

    askForInput();
  }

  printHelp() {
    const moves = this.moves;

    const repeat = (char, times) => Array(times).fill(char).join("");
    const colWidth = Math.max(...moves.map((m) => m.length)) + 2;
    const formatCell = (text) => ` ${text.padEnd(colWidth - 1)}|`;
    const topBorder = `+${repeat("-", colWidth)}${repeat(
      `+${repeat("-", colWidth)}`,
      moves.length
    )}`;

    const headerRow = `|${" ".padEnd(colWidth)}|${moves
      .map((move) => formatCell(move))
      .join("")}`;

    console.log(topBorder);
    console.log(headerRow);
    console.log(topBorder);

    moves.forEach((move, i) => {
      const row = `|${formatCell(move)}${moves
        .map((_, j) => formatCell(this.rules.getWinner(i, j)))
        .join("")}`;
      console.log(row);
      console.log(topBorder);
    });
  }
}

module.exports = Game;
