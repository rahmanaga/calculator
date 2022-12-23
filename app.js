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
  if (typeof result === "number") {
    if (`${result}`.length > 7) {
      return `${result.toFixed(5)}`;
    }
  }
  return `${result}`;
};

let displayValue = "";
const displayArea = document.querySelector(".display");
const allClearBtn = document.querySelector(".allClear");
const clearBtn = document.querySelector(".clear");
const decimalBtn = document.querySelector(".decimal");

const digits = document.querySelectorAll(".digit");
const REGEX_OPERATOR = /[\+\-\*/]/;
const digitHandler = (e) => {
  if (e.type === "click") {
    if (displayValue === "0") {
      displayValue = e.target.textContent;
    } else {
      displayValue += e.target.textContent;
    }
  } else if (e.type === "keyup") {
    if (displayValue === "0") {
      displayValue = e.key;
    } else {
      displayValue += e.key;
    }
  }
  displayArea.textContent = displayValue;
};

const decimalHandler = () => {
  if (
    REGEX_OPERATOR.test(displayValue[displayValue.length - 1]) ||
    displayValue === ""
  ) {
    displayValue += "0.";
  } else if (/[\.]/.test(displayValue)) {
    if (REGEX_OPERATOR.test(displayValue)) {
      const [matchedOperator] = displayValue.match(REGEX_OPERATOR);
      const lastNum = displayValue.split(matchedOperator)[1];
      if (/[\.]/.test(lastNum)) {
        return;
      } else {
        displayValue += ".";
      }
    }
  } else {
    displayValue += ".";
  }
  displayArea.textContent = displayValue;
};

const checkNegative = () => {
  if (/-[0-9.]+[\+\-\*/]-[0-9.]+/.test(displayValue)) {
    const num1 = displayValue.match(/-[0-9.]+/)[0];
    const num2 = displayValue.match(/.-[0-9.]+/)[0].slice(1);
    const operator = displayValue.match(/.-[0-9.]+/)[0][0];
    displayValue = operate(operator, +num1, +num2);
  } else if (/-[0-9.]+[\+\-\*/][0-9.]+/.test(displayValue)) {
    const num1 = displayValue.match(/-[0-9.]+/)[0];
    const num2 = displayValue.slice(num1.length + 1);
    const operator = displayValue.slice(1).match(/[^0-9.][0-9.]+/)[0][0];
    displayValue = operate(operator, +num1, +num2);
  } else if (/[0-9.]+[\+\-\*/]-[0-9.]+/) {
    const num1 = displayValue.match(/[0-9.]+/)[0];
    const num2 = displayValue.slice(1).match(/-[0-9.]+/)[0];
    const operator = displayValue.slice(1).match(/.-[0-9.]+/)[0][0];
    displayValue = operate(operator, +num1, +num2);
  }
};
const operatorHandler = (e) => {
  if (REGEX_OPERATOR.test(displayValue[displayValue.length - 1])) {
    return;
  }
  if (e.type === "click") {
    if (REGEX_OPERATOR.test(displayValue)) {
      if (
        /-[0-9.]+[\+\-\*/]-[0-9.]+/.test(displayValue) ||
        /-[0-9.]+[\+\-\*/][0-9.]+/.test(displayValue) ||
        /[0-9.]+[\+\-\*/]-[0-9.]+/.test(displayValue)
      ) {
        checkNegative();
      } else if (/[0-9]+[\+\-\*/][0-9]+/) {
        const [matchedOperator] = displayValue.match(REGEX_OPERATOR);
        const [num1, num2] = displayValue.split(matchedOperator);
        displayValue = operate(matchedOperator, +num1, +num2);
      }
      if (/Couldn't divide by zero/.test(displayValue)) {
        alert("Couldn't divide by zero");
        displayValue = "";
      } else {
        displayValue += e.target.textContent;
      }
    } else {
      displayValue += e.target.textContent;
    }
  } else if (e.type === "keyup") {
    if (e.key === "/" || e.key === "Enter") {
      e.preventDefault();
    }
    if (REGEX_OPERATOR.test(displayValue)) {
      if (
        /-[0-9.]+[\+\-\*/]-[0-9.]+/.test(displayValue) ||
        /-[0-9.]+[\+\-\*/][0-9.]+/.test(displayValue) ||
        /[0-9.]+[\+\-\*/]-[0-9.]+/.test(displayValue)
      ) {
        checkNegative();
      } else if (/[0-9]+[\+\-\*/][0-9]+/) {
        const [matchedOperator] = displayValue.match(REGEX_OPERATOR);
        const [num1, num2] = displayValue.split(matchedOperator);
        displayValue = operate(matchedOperator, +num1, +num2);
      }
      if (/Couldn't divide by zero/.test(displayValue)) {
        alert("Couldn't divide by zero");
        displayValue = "";
      } else {
        displayValue += e.key;
      }
    } else {
      displayValue += e.key;
    }
  }
  displayArea.textContent = displayValue;
};

const equalHandler = (e) => {
  if (e.key === "/" || e.key === "Enter") {
    e.preventDefault();
  }
  if (
    /-[0-9.]+[\+\-\*/]-[0-9.]+/.test(displayValue) ||
    /-[0-9.]+[\+\-\*/][0-9.]+/.test(displayValue) ||
    /[0-9.]+[\+\-\*/]-[0-9.]+/.test(displayValue)
  ) {
    checkNegative();
  } else if (/[0-9][\+\-\*/][0-9]/.test(displayValue)) {
    const [matchedOperator] = displayValue.match(REGEX_OPERATOR);
    const [num1, num2] = displayValue.split(matchedOperator);
    displayValue = operate(matchedOperator, +num1, +num2);
    if (/Couldn't divide by zero/.test(displayValue)) {
      alert("Couldn't divide by zero");
      displayValue = "";
    }
  } else {
    displayValue = "";
  }
  displayArea.textContent = displayValue;
};
const deleteHandler = () => {
  displayValue = displayValue.slice(0, displayValue.length - 1);
  if (displayValue === "") {
    displayArea.textContent = displayValue;
    return;
  }
  displayArea.textContent = displayValue;
};
window.addEventListener("keyup", (e) => {
  if (/[0-9]/.test(e.key)) {
    digitHandler(e);
  } else if (e.key === ".") {
    decimalHandler();
  } else if (REGEX_OPERATOR.test(e.key)) {
    operatorHandler(e);
  } else if (e.key === "=" || e.key === "Enter") {
    equalHandler(e);
  } else if (e.key === "Backspace") {
    deleteHandler();
  }
});

digits.forEach((digit) => {
  digit.addEventListener("click", digitHandler);
});

decimalBtn.addEventListener("click", decimalHandler);

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
  operator.addEventListener("click", operatorHandler);
});

const equalSign = document.querySelector(".equal");

equalSign.addEventListener("click", equalHandler);

allClearBtn.addEventListener("click", () => {
  displayValue = "";
  displayArea.textContent = "";
});

clearBtn.addEventListener("click", deleteHandler);

const minus = document.querySelector(".plusMinus");

minus.addEventListener("click", () => {
  if (displayValue[displayValue.length - 1] !== "-") {
    displayValue += "-";
  } else {
    if (REGEX_OPERATOR.test(displayValue[displayValue.length - 2])) {
      displayValue = displayValue.slice(0, displayValue.length - 1);
    } else {
      displayValue += "-";
    }
  }
  displayArea.textContent = displayValue;
});
