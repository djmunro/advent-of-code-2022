const fs = require("fs");
const path = require("path");

const WINNING_POINTS = 6;
const DRAW_POINTS = 3;
const NO_POINTS = 0;

// Opponent
const ROCK = "A";
const PAPER = "B";
const SCISSORS = "C";

// Me
const LOSE = "X";
const DRAW = "Y";
const WIN = "Z";

const POINTS_MAP = {
  [LOSE]: NO_POINTS,
  [DRAW]: DRAW_POINTS,
  [WIN]: WINNING_POINTS,
};

const SHAPE_POINTS = {
  [ROCK]: 1, // Rock
  [PAPER]: 2, // Paper
  [SCISSORS]: 3, // Scissors
};

const fileData = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

function calculateRoundOutcome(roundEnding: string, opponent: string) {
  switch (roundEnding) {
    case WIN: {
      if (opponent === ROCK) return PAPER;
      if (opponent === SCISSORS) return ROCK;
      if (opponent === PAPER) return SCISSORS;
    }
    case LOSE: {
      if (opponent === ROCK) return SCISSORS;
      if (opponent === SCISSORS) return PAPER;
      if (opponent === PAPER) return ROCK;
    }
    case DRAW: {
      if (opponent === ROCK) return ROCK;
      if (opponent === SCISSORS) return SCISSORS;
      if (opponent === PAPER) return PAPER;
    }
  }
}

let score = 0;
const rounds = fileData.split("\n");
rounds.forEach((element: string) => {
  const [opponent, roundEnding] = element.split(" ");
  const outcomeScore = (SHAPE_POINTS as any)[
    // @ts-ignore
    calculateRoundOutcome(roundEnding, opponent)
  ];
  const endingScore = (POINTS_MAP as any)[roundEnding];
  const roundScore = outcomeScore + endingScore;
  score += roundScore;
});

console.log(score);
