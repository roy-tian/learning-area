const display = document.getElementById('display');

let operand1 = "";
let operand2 = "";
let operator = "";
let result = "";
let flag = false;

window.onload = () => {
  for (let i = 0; i != 10; i++) {
    document.getElementById('btn-' + i)
      .addEventListener('click', () => onDigitClicked(i));
  }
  document.getElementById('btn-dot')
    .addEventListener('click', () => onDigitClicked('.'));
  document.getElementById('btn-clear')
    .addEventListener('click', onClearClicked);
  document.getElementById('btn-pn')
    .addEventListener('click', onPnClicked);
  document.getElementById('btn-divide')
    .addEventListener('click', () => onOperatorClicked('/'));
  document.getElementById('btn-times')
    .addEventListener('click', () => onOperatorClicked('*'));
  document.getElementById('btn-minus')
    .addEventListener('click',() => onOperatorClicked('-'));
  document.getElementById('btn-plus')
    .addEventListener('click', () => onOperatorClicked('+'));
  document.getElementById('btn-equals')
    .addEventListener('click', onEqualsClicked);
};

function onDigitClicked(digitClicked) {
  if (result != "") { // restart a calculation.
    onClearClicked();
  }
  if (flag) { // means a new number arisen.
    display.textContent = "0";
    flag = false;
  }
  if ( digitClicked >= 0 && digitClicked <= 9 &&
       display.textContent === "0" ) {
  // if numberDisplay is 0, digitClicked will be the 1st digit to go.
    display.textContent = "";
  }
  if (!(digitClicked === '.' && display.textContent.includes('.'))) {
  // needs no more dots 'cause there's already a dot in numberDisplayed.
    display.textContent += digitClicked;
  }
  if (operator === "") {
    operand1 = display.textContent;
  } else {
    operand2 = display.textContent;
  }
  currentStatus();
}

function onOperatorClicked(operatorClicked) {
  if (operand1 === "") {
    operand1 = "0";
  } else if (operator !== "" && operand2 !== "") {
    if (result == "") {
      onEqualsClicked();
    }
    operand1 = result;
    operand2 = "";
  }
  operator = operatorClicked;
  result = "";
  flag = true;
  currentStatus();
}

function onEqualsClicked() {
  if (result !== "") {
    operand1 = result;
  }
  if (operand1 === "") {
    operand1 = display.textContent;
  }
  if (operator !== "" && operand2 === "") {
    operand2 = display.textContent;
  }
  const operand1Value = parseFloat(operand1);
  const operand2Value = parseFloat(operand2);
  switch (operator) {
  case "+":
    result = String(operand1Value + operand2Value);
    break;
  case "-":
    result = String(operand1Value - operand2Value);
    break;
  case "*":
    result = String(operand1Value * operand2Value);
    break;
  case "/":
    result = String(operand1Value / operand2Value);
    break;
  default:
    result = String(operand1Value);
    break;
  }
  display.textContent = result;
  flag = true;
  currentStatus();
}

function onClearClicked() {
  display.textContent = "0";
  operand1 = operand2 = operator = result = "";
  flag = false;
  currentStatus();
}

function onPercentClicked() {
  if (result != "") {
    display.textContent = result = doPercent(result);
  } else if (operand2 !== "") {
    display.textContent = operand2 = doPercent(operand1, operand2);
  } else if (operand1 !== "") {
    display.textContent =
      operator === "" ?
        operand1 = doPercent(operand1) :
        operand2 = doPercent(operand1, operand1);
  }
  currentStatus();
}

function onPnClicked() {
  if (result !== "") {
    display.textContent = result = doNegative(result);
  } else if (operand2 !== "") {
    display.textContent = operand2 = doNegative(operand2); 
  } else if (operand1 !== "") {
    display.textContent = operand1 = doNegative(operand1);
  }
  currentStatus();
}

function doPercent(value, percent = 1) {
  let returnValue = parseFloat(value);
  returnValue /= 100;
  returnValue *= percent;
  return String(returnValue);
}

function doNegative(value) {
  let returnValue = parseFloat(value);
  returnValue *= -1;
  return String(returnValue);
}

function currentStatus() {
  console.log("操作数1：\t" + operand1 + '\n');
  console.log("操作符：\t" + operator + '\n');
  console.log("操作数2：\t" + operand2 + '\n');
  console.log("结果：\t" + result + '\n');
  console.log("flag：\t" + flag + '\n');
}