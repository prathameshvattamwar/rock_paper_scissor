const playerHandIcon = document.querySelector(".player-hand i");
const computerHandIcon = document.querySelector(".computer-hand i");
const options = document.querySelectorAll(".option");
const resultText = document.querySelector(".result-text");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const scoreArea = document.querySelector(".score-area");

const handOptions = {
    rock: "fa-hand-back-fist",
    paper: "fa-hand",
    scissors: "fa-hand-scissors"
};

const initialFist = "fa-hand-fist";
let playerScore = 0;
let computerScore = 0;
let gameActive = true;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "tie";
    }
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ) {
        return "win";
    } else {
        return "lose";
    }
}

function updateScore(result) {
    if (result === "win") {
        playerScore++;
    } else if (result === "lose") {
        computerScore++;
    }
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    scoreArea.style.display = "block";
}

function displayResult(result, playerChoice, computerChoice) {
    resultText.classList.remove("win", "lose", "tie");

    if (result === "win") {
        resultText.textContent = `You Win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
        resultText.classList.add("win");
    } else if (result === "lose") {
        resultText.textContent = `You Lose! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
        resultText.classList.add("lose");
    } else {
        resultText.textContent = `It's a Tie! Both chose ${capitalize(playerChoice)}.`;
        resultText.classList.add("tie");
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateHandIcons(playerChoice, computerChoice) {
    playerHandIcon.className = `fa-solid ${handOptions[playerChoice]} ${playerChoice}`;
    computerHandIcon.className = `fa-solid ${handOptions[computerChoice]} ${computerChoice}`;
}

function resetHandsToFist() {
     playerHandIcon.className = `fa-solid ${initialFist}`;
     computerHandIcon.className = `fa-solid ${initialFist}`;
     resultText.textContent = "Let's Play!!";
     resultText.classList.remove("win", "lose", "tie");
}


function playGame(playerChoice) {
    if (!gameActive) return;
    gameActive = false;

    playerHandIcon.parentElement.classList.add('shake');
    computerHandIcon.parentElement.classList.add('shake');

    setTimeout(() => {
        playerHandIcon.parentElement.classList.remove('shake');
        computerHandIcon.parentElement.classList.remove('shake');

        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);

        updateHandIcons(playerChoice, computerChoice);
        displayResult(result, playerChoice, computerChoice);
        updateScore(result);

        gameActive = true;


    }, 1500);
}

options.forEach(option => {
    option.addEventListener("click", () => {
        if (gameActive) {
            const playerChoice = option.dataset.option;
             resetHandsToFist();
             resultText.textContent = "Rock... Paper... Scissors...";
            playGame(playerChoice);
        }
    });
});

resetHandsToFist();