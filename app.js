const cells = document.querySelectorAll('td');
const usedNumbers = new Set();

const questionText = document.getElementById('question');

const bingoSection = document.querySelector(".bingo");
const newgameBtn = document.getElementById("newgame");
const submitBtn = document.getElementById("submit")

//let num1, num2;

const bingoRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
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

// Function to generate a random addition question
function generateQuestion() {
    // Pick a random number from usedNumbers Set
    const targetNumber = [...usedNumbers][Math.floor(Math.random() * usedNumbers.size)];
    // Find two numbers whose sum equals the targetNumber
    let num1, num2;
    num1 = Math.floor(Math.random() * targetNumber);
    num2 = targetNumber - num1;
    return `What is ${num1} + ${num2}?`;
}


// Function to generate and display the next question
function generateNextQuestion() {
    const question = generateQuestion();
    questionText.textContent = question;
    answerInput.value = '';
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
submitBtn.addEventListener("click", displayBingo);

// Initialize the game
generateRandomNumbers();
generateNextQuestion();

