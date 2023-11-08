const bingoSection = document.querySelector(".bingo");
const newgameBtn = document.getElementById("newgame");
const submitBtn = document.getElementById("submit")

function handleHidden() {
    bingoSection.classList.add("hidden");
}

function displayBingo() {
    bingoSection.classList.remove("hidden");
}

newgameBtn.addEventListener("click", handleHidden);
submitBtn.addEventListener("click", displayBingo);
