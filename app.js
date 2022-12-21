const add = function (num1, num2) {
  return num1 + num2;
};
const subtract = function (num1, num2) {
  return num1 - num2;
};
const multiply = function (num1, num2) {
  return num1 * num2;
};
const divide = function (num1, num2) {
  return num1 / num2;
};
const operate = function (operator, num1, num2) {
  let result;
  switch (operator) {
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    default:
      break;
  }
  return result;
};
