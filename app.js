let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const levelDisplay = document.getElementById("level-display");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

startBtn.addEventListener("click", function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

resetBtn.addEventListener("click", function(){
    startOver();
});

document.querySelectorAll(".quarter").forEach(btn => {
    btn.addEventListener("click", function(){
        if(!started){
            return;
        }
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else {
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    levelDisplay.textContent = level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    flashButton(randomChosenColor);
}

function flashButton(color) {
    const button = document.getElementById(color);
    setTimeout(() => button.classList.add("flash"), 200);
    setTimeout(() => button.classList.remove("flash"), 600);
}

function animatePress(color) {
    const button = document.getElementById(color);
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    levelDisplay.textContent = 0;
}