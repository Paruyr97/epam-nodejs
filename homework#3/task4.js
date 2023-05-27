const fs = require("fs");
fs.readFile(__filename, () => {
  console.log(0);
});

setImmediate(() => {
  console.log(1);
});
setImmediate(() => {
  console.log(2);
});
setImmediate(() => {
  console.log(3);
});
setImmediate(() => {
  console.log(4);
  Promise.resolve(5).then((res) => {
    console.log(res);
  });
});

setImmediate(() => {
  console.log(6);
});
setImmediate(() => {
  console.log(7);
});
setImmediate(() => {
  console.log(8);
});

setTimeout(() => {
  console.log(9);
}, 1000);


//output 1,2,3,4,5,6,7,8,0,9