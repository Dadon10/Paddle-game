// script.js
const game = document.getElementById('game');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');

let paddleX = 150;
let ballX = 190;
let ballY = 0;
let ballDX = 2;
let ballDY = 2;
let gameInterval;
let score = 0;

document.addEventListener('keydown', movePaddle);

function movePaddle(event) {
    const paddleWidth = paddle.offsetWidth;
    const gameWidth = game.offsetWidth;

    if (event.key === 'ArrowLeft' && paddleX > 0) {
        paddleX -= 20;
        if (paddleX < 0) paddleX = 0;
    } else if (event.key === 'ArrowRight' && paddleX < gameWidth - paddleWidth) {
        paddleX += 20;
        if (paddleX > gameWidth - paddleWidth) paddleX = gameWidth - paddleWidth;
    }
    paddle.style.left = paddleX + 'px';
}

function startGame() {
    gameInterval = setInterval(updateGame, 20);
}

function updateGame() {
    ballX += ballDX;
    ballY += ballDY;

    if (ballX <= 0 || ballX >= 380) {
        ballDX *= -1;
    }
    if (ballY <= 0) {
        ballDY *= -1;
    }
    if (ballY >= 580 && ballX >= paddleX && ballX <= paddleX + 100) {
        ballDY *= -1;
        incrementScore();
    }
    if (ballY > 600) {
        alert('Game Over! Your score is ' + score);
        clearInterval(gameInterval);
        resetGame();
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

function incrementScore() {
    score += 1;
    scoreDisplay.innerText = 'Score: ' + score;
}

function resetGame() {
    ballX = 190;
    ballY = 0;
    ballDX = 2;
    ballDY = 2;
    score = 0;
    scoreDisplay.innerText = 'Score: ' + score;
    startGame();
}

startGame();
