const rangeInputs = document.querySelector('input[type="range"]');
const numberInput = document.querySelector("output");
const btnEl = document.querySelector(".btn");
const copyEl = document.querySelector(".copy");
const passwordEl = document.querySelector(".password");
let alphabetLower = Array.from(Array(26), (_, i) =>
  String.fromCharCode(97 + i)
);
let alphabetUpper = Array.from(Array(26), (_, i) =>
  String.fromCharCode(65 + i)
);
let symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "{",
  "}",
  "[",
  "]",
  "|",
  "\\",
  ":",
  ";",
  "<",
  ">",
  ",",
  ".",
  "?",
  "/",
  "~",
];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const mySet = new Set();
let numberOfCheckbox = 0;
function handleInputChange() {
  const min = rangeInputs.min;
  const max = rangeInputs.max;
  rangeInputs.value = numberInput.textContent;

  rangeInputs.style.backgroundSize =
    ((rangeInputs.value - min) * 100) / (max - min) + "% 100%";
}
const convertArrayToSet = (value) => {
  value.forEach((item) => {
    mySet.add(item);
  });
};
const displayBoxColor = (index, checkLen) => {
  const showBox = document.querySelectorAll(".display-box");
  for (let i = 0; i <= showBox.length - 1; i++) {
    if (i <= index) {
      showBox[i].classList.add("display-box-color");
    } else {
      showBox[i].classList.remove("display-box-color");
    }
  }
};
function updatePasswordStrength() {
  const allCheckBox = document.querySelectorAll(
    "input[type = checkbox]:checked"
  );
  const strengthEl = document.querySelector(".strength");

  let checkboxLen = allCheckBox.length;
  if (checkboxLen === 0) {
    // showBox[0].classList.remove("display-box-color");
    displayBoxColor(-1);
    strengthEl.textContent = " ";
    passwordEl.textContent = " ";
    alert(`Select the character's  your password should contain`);
    return;
  } else if (checkboxLen === 1) {
    strengthEl.textContent = "low";
    displayBoxColor(0);
  } else if (checkboxLen === 2) {
    strengthEl.textContent = "Weak";

    displayBoxColor(1);
  } else if (checkboxLen === 3) {
    strengthEl.textContent = "Medium";
    displayBoxColor(2);
  } else if (checkboxLen === 4) {
    strengthEl.textContent = "strong";
    displayBoxColor(3);
  }
}
const getCheckboxValue = function () {
  const allCheckBox = document.querySelectorAll(
    "input[type = checkbox]:checked"
  );
  updatePasswordStrength();
  allCheckBox.forEach((checkbox) => {
    if (checkbox.value === "uppercase") {
      convertArrayToSet(alphabetUpper);
      return;
    } else if (checkbox.value === "lowercase") {
      convertArrayToSet(alphabetLower);
      return;
    } else if (checkbox.value === "numbers") {
      convertArrayToSet(numbers);
      return;
    } else if (checkbox.value === "symbols") {
      convertArrayToSet(symbols);
      return;
    }
  });
};

const displayPassword = () => {
  let password = [];
  getCheckboxValue();
  let allValues = Array.from(mySet);

  // Retrieve the random element from the array
  for (let i = 0; i < +numberInput.textContent; i++) {
    const randomIndex = Math.floor(Math.random() * allValues.length);
    password.push(allValues[randomIndex]);
  }
  passwordEl.textContent = password.join("");
  // console.log(allValues);
};
rangeInputs.addEventListener("input", handleInputChange);
btnEl.addEventListener("click", displayPassword);
handleInputChange();
copyEl.addEventListener("click", function () {
  // Get the text field
  let copyText = document.querySelector(".password").textContent;
  let copyAlert = document.querySelector(".copied");

  navigator.clipboard.writeText(copyText).then((_) => {
    // console.log("Copied to clipboard: " + res);
    copyAlert.style.display = "block";
    setTimeout(() => (copyAlert.style.display = "none"), 3000);
  });
});
