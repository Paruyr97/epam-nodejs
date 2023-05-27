const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("1");
  setImmediate(() => console.log("2"));
  process.nextTick(() => console.log("3"));
  Promise.resolve().then(() => console.log("4"));
});

process.nextTick(() => console.log("5"));
Promise.resolve().then(() => console.log("6"));
setTimeout(() => console.log("7"));

for (let i = 0; i < 2000000000; i++) {}

// output - 5,6,7,1,3,4,2