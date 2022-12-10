const path = require("path");
const fs = require("fs");

const fileData: string = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let lowercasePriorities: { [x: string]: number } = {};
let uppercasePriorities: { [x: string]: number } = {};
alphabet.forEach((letter: string, index: number) => {
  const priority = index + 1;
  lowercasePriorities[letter] = priority;
});
alphabet.forEach((letter: string, index: number) => {
  const priority = index + 27; // a-z: 1-26
  uppercasePriorities[letter.toUpperCase()] = priority;
});

function findSharedItem(
  firstItem: string,
  secondItem: string,
  thirdItem: string
): string {
  let sharedItem = "";
  firstItem.split("").forEach((char: string) => {
    if (secondItem.includes(char) && thirdItem.includes(char)) {
      sharedItem = char;
    }
  });
  return sharedItem;
}

function getItemPriority(item: string) {
  if (item === item.toUpperCase()) {
    return uppercasePriorities[item];
  }
  return lowercasePriorities[item];
}

function groupRucksacks(rucksackData: string[]): string[][] {
  const rucksackGroups: string[][] = [];
  let currentGroup: string[] = [];
  for (let i = 0; i < rucksackData.length; i += 3) {
    rucksackGroups.push(rucksackData.slice(i, i + 3));
  }
  return rucksackGroups;
}

// @ts-ignore
let prioritiesSum = 0;

const rucksackData: string[] = fileData.split("\n");
const groups = groupRucksacks(rucksackData);
groups.forEach((group) => {
  const sharedItem = findSharedItem(group[0], group[1], group[2]);
  if (sharedItem !== "") {
    const priority = getItemPriority(sharedItem);
    prioritiesSum += priority;
  }
});

console.log(prioritiesSum);
