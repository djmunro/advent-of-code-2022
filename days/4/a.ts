const path = require("path");
const fs = require("fs");

const fileData: string = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

function isPairFullyContained(pairs: string): boolean {
  const [firstPair, secondPair] = pairs.split(",");

  const [fs, fe] = firstPair.split("-");
  const [ss, se] = secondPair.split("-");

  const firstStart = parseInt(fs);
  const firstEnd = parseInt(fe);

  const secondStart = parseInt(ss);
  const secondEnd = parseInt(se);

  if (secondStart >= firstStart && secondStart <= firstEnd) {
    return true;
  }
  if (secondEnd >= firstStart && secondEnd <= firstEnd) {
    return true;
  }

  if (firstStart >= secondStart && firstStart <= secondEnd) {
    return true;
  }
  if (firstEnd >= secondStart && firstEnd <= secondEnd) {
    return true;
  }

  // 5-7,7-9 overlaps in a single section, 7.
  // 2-8,3-7 overlaps all of the sections 3 through 7.
  // 6-6,4-6 overlaps in a single section, 6.
  // 2-6,4-8 overlaps in sections 4, 5, and 6.

  return false;
}

let fullyContainedPairs = 0;

// loop through section assignments
fileData.split("\n").forEach((pairs: string) => {
  const hasFullyContainedPair = isPairFullyContained(pairs);
  if (hasFullyContainedPair) {
    fullyContainedPairs += 1;
  }
});

console.log(fullyContainedPairs);
