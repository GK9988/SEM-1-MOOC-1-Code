import { perimeter, area } from "./rectangle.js";

const rect = {
  perimeter: perimeter,
  area: area,
};

const solveRect = (l, b) => {
  console.log(`solving for rectangle with length = ${l} and breadth = ${b}`);

  if (l <= 0 || b <= 0) {
    console.log("Rectangle Dimensions should be greater than 0");
  } else {
    console.log(`The area of the rectangle is = ${rect.area(l, b)}`);
    console.log(`The perimeter of the rectangle is = ${rect.perimeter(l, b)}`);
  }
};

solveRect(2, 4);
// solveRect(0, 5);
// solveRect(-3, 5);
