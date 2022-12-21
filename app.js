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
  if (num2 === 0) {
    return "Couldn't divide by zero";
  }
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
  return `${result}`;
};
let displayValue = "0";
const displayArea = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");

const digits = document.querySelectorAll(".digit");

digits.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    if (displayValue === "0") {
      displayValue = e.target.textContent;
    } else {
      displayValue += e.target.textContent;
    }
    displayArea.textContent = displayValue;
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (/[\+\-\*/]/.test(displayValue[displayValue.length - 1])) {
      return;
    }
    if (/[\+\-\*/]/.test(displayValue)) {
      const [matchedOperator] = displayValue.match(/[\+\-\*/]/);
      const [num1, num2] = displayValue.split(matchedOperator);
      displayValue = operate(matchedOperator, +num1, +num2);
      if (/Couldn't divide by zero/.test(displayValue)) {
        alert("Couldn't divide by zero");
        displayValue = "";
      } else {
        displayValue += e.target.textContent;
      }
    } else {
      displayValue += e.target.textContent;
    }
    displayArea.textContent = displayValue;
  });
});

const equalSign = document.querySelector(".equal");

equalSign.addEventListener("click", (e) => {
  if (/[0-9][\+\-\*/][0-9]/.test(displayValue)) {
    const [matchedOperator] = displayValue.match(/[\+\-\*/]/);
    const [num1, num2] = displayValue.split(matchedOperator);
    displayValue = operate(matchedOperator, +num1, +num2);
    if (/Couldn't divide by zero/.test(displayValue)) {
      alert("Couldn't divide by zero");
      displayValue = "";
    }
  } else {
    displayValue = "0";
  }
  displayArea.textContent = displayValue;
});

clearBtn.addEventListener("click", () => {
  displayValue = "0";
  displayArea.textContent = "0";
});
