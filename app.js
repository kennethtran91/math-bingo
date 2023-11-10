const cells = document.querySelectorAll("td");
const usedNumbers = new Set();
const usedAnswers = new Set();
const answerSets = new Set();

const questionText = document.getElementById("question");
const answerButton = document.querySelector(".button-container");
// Container to hold the buttons
const buttonContainer = document.getElementById('buttonContainer');

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
  return answer;
}

// Function to generate and display the next question
function generateNextQuestion(targetNumber) {
  // Generate two random numbers
  num1 = Math.floor(Math.random() * targetNumber);
  num2 = targetNumber - num1;

  // Construct the addition expression
  const additionExpression = `${num1} + ${num2}`;
  questionText.textContent = "What is " + additionExpression + " = ?";

  // Return an object with the expression and the correct answer
  return additionExpression;
}


function generateAnswerButtonsHTML(randomNumber) {
  
    // Create the button element
    const buttonElement = document.createElement('button');
    buttonElement.className = 'pushable item';
    buttonElement.id = 'answer';

    // Create the span element
    const spanElement = document.createElement('span');
    spanElement.className = 'front';

    buttonElement.appendChild(spanElement);

    // Append the button element to the document
    document.getElementById('buttonContainer').appendChild(buttonElement);
    spanElement.textContent = `${randomNumber}`;

    // Append the span element as a child of the button element
    buttonElement.appendChild(spanElement);

    // Append the button element to the container
    buttonContainer.appendChild(buttonElement);
}

// Generate 3 randoms answers
function generateAnswerButtons() {
  const randomNumbers = [];
  answerButton.innerHTML = ''; // Clear previous content
  console.log(randomNumbers, "should be a empty array random answers")

  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    randomNumbers.push(randomNumber);
  }

  let randomIndex = Math.floor(Math.random() * randomNumbers.length);
  let removedNumber = randomNumbers.splice(randomIndex, 1);
  // Insert the new number at the random index
  randomNumbers.splice(randomIndex, 0, answer);

  // Check for duplicates and replace them with unique numbers
for (let i = 0; i < randomNumbers.length; i++) {
  for (let j = i + 1; j < randomNumbers.length; j++) {
      if (randomNumbers[i] === randomNumbers[j]) {
          // Replace duplicate with a new unique number
          randomNumbers[j] = generateUniqueRandomNumber(randomNumbers);
      }
  }
}

  for (let i = 0; i < 4; i++) {
    generateAnswerButtonsHTML(randomNumbers[i]);
  }
  return randomNumbers;
}

// Function to generate a unique random number
function generateUniqueRandomNumber(existingNumbers) {
  let newNumber;
  do {
      newNumber = Math.floor(Math.random() * 10) + 1; // You can adjust the range as needed
  } while (existingNumbers.includes(newNumber));
  return newNumber;
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

// newgameBtn.addEventListener("click", newGame);
// submitBtn.addEventListener("click", displayBingo);

// Initialize the game
generateRandomNumbers();
generateNextQuestion(generateUniqueAnswer());
generateAnswerButtons();

