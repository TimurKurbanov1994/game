const colors = ["tomato", "skyblue", "violet", "orange", "palegreen"];

export function finishGame(selectorTime, value) {
    selectorTime.parentNode.classList.add("hide");
    board.innerHTML = `
<h1 class="animate__animated">Ваш счет: ${value}</h1>
<!--<table class="table">-->
<!--<tr><th>Счет</th><th>Дата</th></tr>-->
<!--<tr><td>15</td><td>12.05.21</td></tr>-->
<!--</table>-->
    <button class="time-btn play-btn" id="play-btn">Сыграть еще раз</button>`;
    const playButton = document.querySelector("#play-btn");

    addLocalStorage(value);

    playButton.addEventListener("click", () => {
        document.location.reload();
        localStorage.clear();
    });
}

export function createRandomCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle", "animate__animated", "animate__zoomIn");
    const size = getRandomNumber(15, 50);
    const {width, height} = board.getBoundingClientRect();
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

export function createModal(title, content) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const html = `
      <h1>${title}</h1>
      <div class="modal-content">${content}</div>
    `;

    modal.innerHTML = html;
}

export function addLocalStorage(value) {
    localStorage.setItem('score', value)
}


export function getLocalStorage(selector, selectorTime, value, btn) {
    if (localStorage.getItem('score')) {
        for (let i = 0; i < selector.length - 1; i++) {
            selector[i].classList.add('up')
            finishGame(selectorTime, value)
            btn.style.display = "block";
        }
    }
}

export class Result {
    static send(score) {
        return fetch('https://game-with-authorization-default-rtdb.europe-west1.firebasedatabase.app/result.json', {
            method: 'POST',
            body: JSON.stringify(score),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                score.id = response.name
                return score
            })
            .then(data => console.log(data))
    }
}


function sendScore(value) {
    if (value == 0) {
        console.log('Не отправлять')
        return
    }
    const resultScore = {
        score: value,
        data: new Date().toJSON()
    }
    console.log('Отправил')
    Result.send(resultScore)
}

