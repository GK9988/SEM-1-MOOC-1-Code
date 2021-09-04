import rect from "./rectangle.js";

const solveRect = (l, b) => {
  console.log(`solving for rectangle with length = ${l} and breadth = ${b}`);

  rect(l, b, (err, rectangle) => {
    if (err) {
      console.log(`ERROR: ${err.message}`);
    } else {
      console.log(
        `area of rectangle with length = ${l} and breadth= ${b} is = ${rectangle.area()}`
      );
      console.log(
        `perimeter of rectangle with length = ${l} and breadth= ${b} is = ${rectangle.perimeter()}`
      );
    }
  });
};

solveRect(2, 4);
// solveRect(0, 5);
// solveRect(-3, 5);
