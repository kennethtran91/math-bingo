const cells = document.querySelectorAll("td");
const usedNumbers = new Set();
const usedAnswers = new Set();

const questionText = document.getElementById("question");
const answerInput = document.getElementById("answer");

const bingoSection = document.querySelector(".bingo");
const newgameBtn = document.getElementById("newgame");
const submitBtn = document.getElementById("submit");

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
console.log(usedNumbers);
// Function to generate a random addition question
// function generateQuestion() {
//   // Pick a random number from usedNumbers Set
//   const targetNumber = [...usedNumbers][
//     Math.floor(Math.random() * usedNumbers.size)
//   ];
//   // Find two numbers whose sum equals the targetNumber
//   // let num1, num2; //these variables need to be global so submitAnswer() can access and check the answer
//   num1 = Math.floor(Math.random() * targetNumber);
//   num2 = targetNumber - num1;
//   return [num1, num2];
// }

// Function to generate a random unique answer
function generateUniqueAnswer() {
  do {
    answer = [...usedNumbers][Math.floor(Math.random() * usedNumbers.size)];
  } while (usedAnswers.has(answer));

  usedAnswers.add(answer);
  console.log(answer, "answer");
  return answer;
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

// Function to handle answer submission
// check user input, if it is corrected, then add .marked class into the cell
// change the question field to correct/wrong according to the answer
// then set to next question

function submitAnswer() {
  const playerAnswer = parseInt(answerInput.value);

  if (!isNaN(playerAnswer)) {
    if (playerAnswer === answer) {
      // Correct answer
      cells.forEach((cell, index) => {
        if (cell.textContent == answer && !cell.classList.contains("marked")) {
          cell.classList.add("marked");
          markedCells.add(index);
        }
      });

      // usedAnswers.delete(currentAnswer); // Remove the answer from usedAnswers
      generateNextQuestion(generateUniqueAnswer());
      answerInput.value = ""; //reset input field
      console.log(usedAnswers);
    } else {
      // Wrong answer
      questionText.textContent = "Wrong answer!";
      answerInput.value = "";
      // endGame();
    }
  }
}

//Functon to handle click
function newGame() {
  handleHidden();
  usedNumbers.clear();
  generateRandomNumbers();
  generateNextQuestion();
}

function handleHidden() {
  bingoSection.classList.add("hidden");
}

function displayBingo() {
  bingoSection.classList.remove("hidden");
}

newgameBtn.addEventListener("click", newGame);
// submitBtn.addEventListener("click", displayBingo);

// Event listener for Enter key press in the answer input field
answerInput.addEventListener("keyup", (event) => {
  if (!gameEnded && event.key === "Enter") {
    submitAnswer();
  }
});

// Initialize the game
generateRandomNumbers();
generateNextQuestion(generateUniqueAnswer());
