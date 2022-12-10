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
  firstCompartment: string,
  secondCompartment: string
): string {
  let sharedItem = "";
  firstCompartment.split("").forEach((char: string) => {
    if (secondCompartment.includes(char)) {
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

let prioritiesSum = 0;

const rucksacks: string[] = fileData.split("\n");
rucksacks.forEach((rucksack) => {
  const middleIndex = rucksack.length / 2;
  const firstCompartment = rucksack.slice(0, middleIndex);
  const secondCompartment = rucksack.slice(middleIndex, rucksack.length);

  const sharedItem = findSharedItem(firstCompartment, secondCompartment);
  if (sharedItem) {
    const priority = getItemPriority(sharedItem);
    prioritiesSum += priority;
  }
});

console.log(prioritiesSum);
