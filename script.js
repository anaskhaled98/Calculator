// Light/Dark Theme
const themeBotton = document.querySelector(".themes__toggle");

const darkThemeHandler = () => {
  themeBotton.classList.toggle("themes__toggle--isActive");
};
const darkThemeAccessibility = (event) => {
  if (event.key === "Enter") darkThemeHandler();
};

themeBotton.addEventListener("click", darkThemeHandler);
themeBotton.addEventListener("keydown", darkThemeAccessibility);

// Calculator Logic
const keyElements = document.querySelectorAll("[data-type]");
const resultElement = document.querySelector(".calc__result");

let storedNumber = "";
let currentNumber = "";
let operation = "";

const updateScreen = (value) => {
  resultElement.textContent = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "0" && !currentNumber) return;
  if (value === "." && currentNumber.includes(".")) return;

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
    if (currentNumber) excuteButtonHandler();
    operation = operationValue;
  }
};

const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    const elementType = element.dataset.type;
    const elementValue = element.dataset.value;

    if (elementType === "number") {
      numberButtonHandler(elementValue);
    } else if (elementType === "operation") {
      switch (elementValue) {
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
          operationHandler(elementValue);
      }
    }
  });
};

keyElements.forEach(keyElementsHandler);

// Accessibility
const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operationsArray = ["Backspace", "Enter", "c", "+", "-", "/", "*"];
const elmentsArray = [...numbersArray, ...operationsArray];

const keyboardWithHover = (key) => {
  if (elmentsArray.includes(key)) {
    const calculatorElement = document.querySelector(`[data-value="${key}"]`);
    calculatorElement.classList.add("hover");
    calculatorElement.click();
    setTimeout(() => calculatorElement.classList.remove("hover"), 100);
  }
};

window.addEventListener("keydown", (Event) => {
  keyboardWithHover(Event.key);
});
