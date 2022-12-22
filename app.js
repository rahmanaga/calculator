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
let displayValue = "0";
const displayArea = document.querySelector(".display");
const allClearBtn = document.querySelector(".allClear");
const clearBtn = document.querySelector(".clear");
const decimalBtn = document.querySelector(".decimal");

const digits = document.querySelectorAll(".digit");

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
    /[\+\-\*/]/.test(displayValue[displayValue.length - 1]) ||
    displayValue === ""
  ) {
    displayValue += "0.";
  } else if (/[\.]/.test(displayValue)) {
    if (/[\+\-\*/]/.test(displayValue)) {
      const [matchedOperator] = displayValue.match(/[\+\-\*/]/);
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

const operatorHandler = (e) => {
  if (/[\+\-\*/]/.test(displayValue[displayValue.length - 1])) {
    return;
  }
  if (e.type === "click") {
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
  } else if (e.type === "keyup") {
    if (e.key === "/") {
      e.preventDefault();
    }
    if (/[\+\-\*/]/.test(displayValue)) {
      const [matchedOperator] = displayValue.match(/[\+\-\*/]/);
      const [num1, num2] = displayValue.split(matchedOperator);
      displayValue = operate(matchedOperator, +num1, +num2);
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

const equalHandler = () => {
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
  console.log(e.key);
  if (/[0-9]/.test(e.key)) {
    digitHandler(e);
  } else if (/[\.]/.test(e.key)) {
    decimalHandler();
  } else if (/[\+\-\*/]/.test(e.key)) {
    operatorHandler(e);
  } else if (/[=]/.test(e.key) || /Enter/.test(e.key)) {
    equalHandler();
  } else if (/Backspace/.test(e.key)) {
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
