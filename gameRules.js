class GameRules {
  constructor(moves) {
    this.moves = moves;
    this.numMoves = moves.length;
  }

  getWinner(i, j) {
    if (i === j) return "Draw";
    const n = this.numMoves;
    const p = Math.floor(n / 2);
    const result = (j - i + n) % n;
    return result <= p ? "Win" : "Lose";
  }
}

module.exports = GameRules;
