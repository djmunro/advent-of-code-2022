const path = require("path");
const fs = require("fs");

const fileData: string = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const stacks: string[][] = [
  [],
  ["R", "P", "C", "D", "B", "G"], //1
  ["H", "V", "G"], // 2
  ["N", "S", "Q", "D", "J", "P", "M"], // 3
  ["P", "S", "L", "G", "D", "C", "N", "M"], // 4
  ["J", "B", "N", "C", "P", "F", "L", "S"], // 5
  ["Q", "B", "D", "Z", "V", "G", "T", "S"], // 6
  ["B", "Z", "M", "H", "F", "T", "Q"], // 7
  ["C", "M", "D", "B", "F"], // 8
  ["F", "C", "Q", "G"], // 9
];

function processInstructions(fileData: string): void {
  fileData.split("\n").forEach((step: string) => {
    const match = step.match(
      /move (?<cratesToMove>\d+) from (?<from>\d+) to (?<to>\d+)/
    );
    // @ts-ignore
    const { cratesToMove, from, to } = match!.groups;

    const sliced = stacks[parseInt(from)].splice(
      -parseInt(cratesToMove),
      parseInt(cratesToMove)
    );

    stacks[parseInt(to)] = [...stacks[parseInt(to)], ...sliced];
  });
}

function getEndingCrates(stacks: string[][]): string {
  let message = "";
  stacks.forEach((stack: string[]) => {
    if (stack.at(-1)) {
      message += stack.at(-1);
    }
  });
  return message;
}

processInstructions(fileData);
const message = getEndingCrates(stacks);
console.log(message);
