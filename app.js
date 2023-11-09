const cells = document.querySelectorAll('td');
const usedNumbers = new Set();
const questionText = document.getElementById('question');
const answerInput = document.getElementById('answer');
const winMessage = document.getElementById('win-message');
const loseMessage = document.getElementById('lose-message');
const firework = document.getElementsByClassName('firework');
const newGameButton = document.getElementById('new-game');

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

let num1, num2;
let markedCells = new Set();
let gameEnded = false;
let correctAnswer = true;

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
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    return `What is ${num1} + ${num2}?`;
}

// Initialize the game
generateRandomNumbers();
generateNextQuestion();

// Function to generate and display the next question
function generateNextQuestion() {
    const question = generateQuestion();
    questionText.textContent = question;
    answerInput.value = '';
}

// Event listener for Enter key press in the answer input field
answerInput.addEventListener('keyup', (event) => {
    if (!gameEnded && event.key === 'Enter') {
        submitAnswer();
    }
});

// Function to handle answer submission
function submitAnswer() {
    const userAnswer = parseInt(answerInput.value);
    if (!gameEnded && !isNaN(userAnswer) && userAnswer === num1 + num2) {
        questionText.textContent = "Correct!";
        answerInput.value = '';
        cells.forEach((cell, index) => {
            if (cell.textContent == num1 + num2 && !cell.classList.contains('marked')) {
                cell.classList.add('marked');
                markedCells.add(index);
            }
        });

        if (checkForBingo()) {
            endGame();
        } else {
            setTimeout(() => {
                generateNextQuestion();
            }, 1000);
        }
    } else {
        questionText.textContent = "Wrong answer!";
        answerInput.value = '';
        wrongAnwser();
    }
}

// Function to check for a Bingo
function checkForBingo() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            cells[i * 3].classList.contains('marked') &&
            cells[i * 3 + 1].classList.contains('marked') &&
            cells[i * 3 + 2].classList.contains('marked')
        ) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            cells[i].classList.contains('marked') &&
            cells[i + 3].classList.contains('marked') &&
            cells[i + 6].classList.contains('marked')
        ) {
            return true;
        }
    }

    // Check diagonals
    if (
        cells[0].classList.contains('marked') &&
        cells[0].classList.contains('marked') === cells[4].classList.contains('marked') &&
        cells[0].classList.contains('marked') === cells[8].classList.contains('marked')
    ) {
        return true;
    }
    if (
        cells[2].classList.contains('marked') &&
        cells[2].classList.contains('marked') === cells[4].classList.contains('marked') &&
        cells[2].classList.contains('marked') === cells[6].classList.contains('marked')
    ) {
        return true;
    }

}

// Function to end the game
function endGame() {
    gameEnded = true;
    winMessage.style.display = 'block';
    for (let i = 0; i < 3; i++) {
        firework[i].style.display = 'flex';
    }
    newGameButton.addEventListener('click', () => {
        winMessage.style.display = 'none';
        resetGame();
    });
}

// Function to end the game when enter wrong answer
function wrongAnwser() {
    gameEnded = true;
    loseMessage.style.display = 'block';

    newGameButton.addEventListener('click', () => {
        loseMessage.style.display = 'none';
        resetGame();
    });
}

// Function to reset the game
function resetGame() {
    usedNumbers.clear();
    markedCells.clear();
    gameEnded = false;
    cells.forEach(cell => {
        cell.classList.remove('marked');
        cell.textContent = '';
    }
    );
    questionText.textContent = '';
    answerInput.value = '';
    generateRandomNumbers();
    generateNextQuestion();
    loseMessage.style.display = 'none';
    winMessage.style.display = 'none';
    for (let i = 0; i < 3; i++) {
        firework[i].style.display = 'none';
    }

}
