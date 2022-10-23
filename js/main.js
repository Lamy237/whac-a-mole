const squares = document.querySelectorAll(".square");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time-left");
const playButton = document.querySelector("#play");
const resetButton = document.querySelector("#reset");

let molePosition;
let moleTimer = null;
let countDownTimer = null;

const gameInfo = {
    result: 0,
    timeLeft: 10
};

function playGame() {
    setScoreDisplay();
    setTimeDisplay();

    moleTimer = setInterval(selectRandomSquare, 600);
    countDownTimer = setInterval(countDown, 1000);

    squares.forEach((square) => {
        square.addEventListener("mousedown", incrementResult);
    });
}

function setScoreDisplay() {
    scoreDisplay.textContent = gameInfo.result;
}

function setTimeDisplay() {
    timeDisplay.textContent = gameInfo.timeLeft;
}

function selectRandomSquare() {
    squares.forEach((square) => {
        square.classList.remove("mole");
    });

    const randomNumber = Math.floor(Math.random() * squares.length);
    const selectedSquare = squares[randomNumber];
    selectedSquare.classList.add("mole");
    molePosition = selectedSquare.id;
}

function countDown() {
    gameInfo.timeLeft--;
    setTimeDisplay();

    if (gameInfo.timeLeft === 0) {
        resetGame();
    }
}

function incrementResult() {
    if (this.id === molePosition) {
        gameInfo.result++;
        setScoreDisplay();
    }
}

function resetGame() {
    clearInterval(moleTimer);
    clearInterval(countDownTimer);

    gameInfo.timeLeft = 10;
    gameInfo.result = 0;

    squares.forEach((square) => {
        square.removeEventListener("mousedown", incrementResult);
        square.classList.remove("mole");
    });

    playButton.classList.remove("offscreen");
    resetButton.classList.add("offscreen");
}

playButton.addEventListener("click", () => {
    playGame()
    playButton.classList.add("offscreen");
    resetButton.classList.remove("offscreen");
});

resetButton.addEventListener("click", () => {
    resetGame();
    setScoreDisplay();
    setTimeDisplay();
    playButton.classList.remove("offscreen");
    resetButton.classList.add("offscreen");
});
