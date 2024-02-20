// Light/Dark theme
const themeElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => {
  themeElement.classList.toggle("themes__toggle--isActive");
};

const DarkThemeAccissability = (event) => {
  if (event.key === "Enter") {
    toggleDarkTheme();
  }
};

themeElement.addEventListener("click", toggleDarkTheme);
themeElement.addEventListener("keydown", DarkThemeAccissability);

// Logic for calculator
let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.textContent = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";

  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (currentNumber) {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    updateScreen(currentNumber);
  }
};

const excuteButtonHandler = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};

const operationHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    // debugger;

    if (currentNumber) excuteButtonHandler();
    operation = operationValue;
  }
};

const keyElementHandler = (Element) => {
  Element.addEventListener("click", () => {
    const { type } = Element.dataset;
    if (type === "number") {
      numberButtonHandler(Element.dataset.value);
    } else if (type === "operation") {
      switch (Element.dataset.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          excuteButtonHandler();
          break;
        default:
          operationHandler(Element.dataset.value);
      }
    }
  });
};

keyElements.forEach(keyElementHandler);
