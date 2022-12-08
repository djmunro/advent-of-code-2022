const fs = require("fs");
const path = require("path");

const fileData = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
  flag: "r",
});

const elfData: string[][] = [];
var elfItems: string[] = [];
fileData.split("\n").forEach((item: string) => {
  if (item) {
    elfItems.push(item);
  } else {
    elfData.push(elfItems);
    elfItems = [];
  }
});

const calorieData: number[] = [];
elfData.forEach((data) => {
  const total = data.reduce((a: any, b: any) => Number(a) + Number(b), 0);
  calorieData.push(total);
});

calorieData
  .sort(function (a: number, b: number) {
    return a - b;
  })
  .reverse();

console.log(calorieData);

// grab the last 3 items from the list
const topThree = calorieData.slice(0, 3);

console.log(69281 + 67653 + 64590);
