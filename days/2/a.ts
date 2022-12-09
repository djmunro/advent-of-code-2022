const fs = require("fs");
const path = require("path");

const WINNING_POINTS = 6;
const DRAW_POINTS = 3;
const NO_POINTS = 0;

// Opponent
const OPP_ROCK = "A";
const OPP_PAPER = "B";
const OPP_SCISSORS = "C";

// Me
const ROCK = "X";
const PAPER = "Y";
const SCISSORS = "Z";

const SHAPE_POINTS = {
  [ROCK]: 1, // Rock
  [PAPER]: 2, // Paper
  [SCISSORS]: 3, // Scissors
};

const fileData = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

function calculateRoundOutcome(me: string, opponent: string) {
  switch (me) {
    case ROCK: {
      if (opponent === OPP_ROCK) return 3;
      if (opponent === OPP_SCISSORS) return 6;
      if (opponent === OPP_PAPER) return 0;
    }
    case PAPER: {
      if (opponent === OPP_ROCK) return 6;
      if (opponent === OPP_SCISSORS) return 0;
      if (opponent === OPP_PAPER) return 3;
    }
    case SCISSORS: {
      if (opponent === OPP_ROCK) return 0;
      if (opponent === OPP_SCISSORS) return 3;
      if (opponent === OPP_PAPER) return 6;
    }
  }
}

let score = 0;
const rounds = fileData.split("\n");
rounds.forEach((element: string) => {
  const [opponent, me] = element.split(" ");
  const outcomeScore = calculateRoundOutcome(me, opponent);
  const roundScore = outcomeScore + (SHAPE_POINTS as any)[me];
  score += roundScore;
});

console.log(score);
