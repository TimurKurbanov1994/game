

export function startGame(argTimer) {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(argTimer);
}

function decreaseTime(argTimer) {
    if (argTimer === 0) {
        finishGame();
    } else {
        let current = --argTimer;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.textContent = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add("hide");
    board.innerHTML = `<h1 class="animate__animated animate__pulse">Ваш счет: ${score}</h1>
    <button class="time-btn play-btn animate__animated animate__bounce" id="play-btn">Сыграть еще раз</button>`;
    const playButton = document.querySelector("#play-btn");
    playButton.addEventListener("click", () => {
        document.location.reload();
    });
    setColor();
}

export function createRandomCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle", "animate__animated", "animate__zoomIn");
    const size = getRandomNumber(15, 50);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(15, width - size);
    const y = getRandomNumber(15, height - size);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = colors[getRandomNumber(0, colors.length)];
    board.appendChild(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function setColor() {
    const startColor = getRandomColor();
    return colors[startColor];
}