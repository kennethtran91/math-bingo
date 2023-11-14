const cells = document.querySelectorAll("td");
const usedNumbers = new Set();
const usedAnswers = new Set();

const questionText = document.getElementById("question");

const bingoSection = document.querySelector(".bingo");
const newgameBtn = document.getElementById("newgame");
const submitBtn = document.getElementById("submit");
const playBtn = document.getElementById("play");
const gameScreen = document.querySelector(".game-screen");
const loadingScreen = document.querySelector(".loading");
const winMessage = document.getElementById("win-message");
const loseMessage = document.getElementById("lose-message");
const firework = document.getElementsByClassName("firework");

const buttons = document.querySelectorAll(".guess-btn");
let num1, num2, answer; //set this variables to be global
let markedCells = new Set();
let gameEnded = false;
// const targetNumber = [...usedNumbers][
//   Math.floor(Math.random() * usedNumbers.size)
// ];

const bingoRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function replaceDuplicatesWithRandom(arr) {
  const uniqueValues = [];
  const seenValues = {};

  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];

    // Check if the value is a duplicate
    if (seenValues[currentValue] !== undefined) {
      // Replace the duplicate value with a random value
      arr[i] = Math.floor(Math.random() * 100); // You can adjust the range as needed
    } else {
      // Add the unique value to the result array and mark it as seen
      uniqueValues.push(currentValue);
      seenValues[currentValue] = true;
    }
  }

  return arr;
}

// Function to generate and set random numbers from 1 to 20 in each cell
function generateRandomNumbers() {
  for (let i = 0; i < cells.length; i++) {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 20) + 1;
    } while (usedNumbers.has(randomNum));
    usedNumbers.add(randomNum);
    cells[i].textContent = randomNum;
  }
}

// Function to generate a random unique answer
function generateUniqueAnswer() {
  do {
    answer = [...usedNumbers][Math.floor(Math.random() * usedNumbers.size)];
  } while (usedAnswers.has(answer));

  usedAnswers.add(answer);
  console.log(answer, "answer");
  return answer;
}

function generateButtonsHTML() {
  const answersSet = [
    answer,
    answer + 1,
    getRandomInt(1, 20),
    getRandomInt(1, 20),
    getRandomInt(1, 20),
    getRandomInt(0, 20),
  ];
  replaceDuplicatesWithRandom(answersSet);
  shuffleArray(answersSet);
  console.log(answersSet);

  for (let i = 0; i < answersSet.length; i++) {
    buttons[i].innerHTML = answersSet[i];
  }
}

// Function to generate and display the next question
function generateNextQuestion(targetNumber) {
  // Generate two random numbers
  num1 = Math.floor(Math.random() * targetNumber);
  num2 = targetNumber - num1;

  // Construct the addition expression
  const additionExpression = `${num1} + ${num2}`;
  questionText.textContent = "What is " + additionExpression + "?";

  // Return an object with the expression and the correct answer
  return additionExpression;
}

function clearButtonText() {
  for (let i = 0; i < 3; i++) {
    buttons[i].innerHTML = "";
  }
}

// Function to handle answer submission
// check user input, if it is corrected, then add .marked class into the cell
// change the question field to correct/wrong according to the answer
// then set to next question

function submitAnswer(value) {
  const playerAnswer = value;

  if (playerAnswer == answer) {
    // Correct answer
    cells.forEach((cell, index) => {
      if (cell.textContent == answer && !cell.classList.contains("marked")) {
        cell.classList.add("marked");
        markedCells.add(index);
      }
    });
    if (checkForBingo()) {
      console.log("WIN");
      endGame("win");
    } else {
      setTimeout(() => {
        clearButtonText();
        generateNextQuestion(generateUniqueAnswer());
        generateButtonsHTML();
      }, 500);
    }

    // usedAnswers.delete(currentAnswer); // Remove the answer from usedAnswers
  } else {
    // Wrong answer
    questionText.textContent = "Wrong answer!";
    endGame("lose");
  }
}

function checkForBingo() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      cells[i * 3].classList.contains("marked") &&
      cells[i * 3 + 1].classList.contains("marked") &&
      cells[i * 3 + 2].classList.contains("marked")
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      cells[i].classList.contains("marked") &&
      cells[i + 3].classList.contains("marked") &&
      cells[i + 6].classList.contains("marked")
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    cells[0].classList.contains("marked") &&
    cells[0].classList.contains("marked") ===
      cells[4].classList.contains("marked") &&
    cells[0].classList.contains("marked") ===
      cells[8].classList.contains("marked")
  ) {
    return true;
  }
  if (
    cells[2].classList.contains("marked") &&
    cells[2].classList.contains("marked") ===
      cells[4].classList.contains("marked") &&
    cells[2].classList.contains("marked") ===
      cells[6].classList.contains("marked")
  ) {
    return true;
  }
}

//Functon to handle click
function newGame() {
  handleHidden();
  usedNumbers.clear();
  generateRandomNumbers();
  generateNextQuestion(generateUniqueAnswer());
  generateButtonsHTML();
}

function endGame(condition) {
  gameEnded = true;
  if (condition == "win") {
    winMessage.style.display = "block";
    for (let i = 0; i < 3; i++) {
      firework[i].style.display = "flex";
    }
  } else {
    loseMessage.style.display = "block";
  }
}

function handleHidden() {
  //   bingoSection.classList.add("hidden");
  winMessage.style.display = "none";
  loseMessage.style.display = "none";
  cells.forEach((cell, index) => {
    if (cell.classList.contains("marked")) {
      cell.classList.remove("marked");
    }
  });
  for (let i = 0; i < 3; i++) {
    firework[i].style.display = "none";
  }
}

function displayBingo() {
  bingoSection.classList.remove("hidden");
}

function loadGameScreen() {
  loadingScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
}

playBtn.addEventListener("click", loadGameScreen);

// newgameBtn.addEventListener("click", newGame);
// submitBtn.addEventListener("click", displayBingo);

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    submitAnswer(button.innerHTML);
  });
});

// Initialize the game
generateRandomNumbers();
generateNextQuestion(generateUniqueAnswer());
generateButtonsHTML();