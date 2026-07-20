const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

// Store calculation history
let history = [];

function appendValue(value) {
  const operators = ["+", "-", "*", "/", "%"];
  const lastChar = display.value.slice(-1);

  // Prevent operator at beginning
  if (operators.includes(value)) {
    if (display.value === "") return;

    // Replace consecutive operators
    if (operators.includes(lastChar)) {
      display.value = display.value.slice(0, -1) + value;
      return;
    }
  }

  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    if (display.value.trim() === "") return;

    const expression = display.value;

    const lastChar = expression.slice(-1);
    const operators = ["+", "-", "*", "/", "%"];

    // Remove trailing operator before evaluation
    let finalExpression = expression;

    if (operators.includes(lastChar)) {
      finalExpression = expression.slice(0, -1);
    }

    const result = eval(finalExpression);

    display.value = result;

    addHistory(finalExpression, result);

  } catch (error) {
    display.value = "Error";
  }
}

function addHistory(expression, result) {

  const item = {
    expression,
    result
  };

  history.unshift(item);

  renderHistory();
}

function renderHistory() {

  historyList.innerHTML = "";

  history.forEach(item => {

    const li = document.createElement("li");

    li.textContent = `${item.expression} = ${item.result}`;

    // Click history item to reuse result
    li.addEventListener("click", () => {
      display.value = item.result;
    });

    historyList.appendChild(li);

  });

}

function clearHistory() {

  history = [];

  historyList.innerHTML = "";

}

document.addEventListener("keydown", function (event) {

  const key = event.key;

  if (
    (key >= "0" && key <= "9") ||
    ["+", "-", "*", "/", ".", "%"].includes(key)
  ) {
    appendValue(key);
  }

  else if (key === "Enter") {
    event.preventDefault();
    calculateResult();
  }

  else if (key === "Backspace") {
    event.preventDefault();
    deleteLast();
  }

  else if (key === "Escape") {
    clearDisplay();
  }

});