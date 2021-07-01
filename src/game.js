const colors = ["tomato", "skyblue", "violet", "orange", "palegreen"];

export function finishGame(selectorTime, value) {
  selectorTime.parentNode.classList.add("hide");
  board.innerHTML = `<h1 class="animate__animated">Ваш счет: ${value}</h1>
    <button class="time-btn play-btn" id="play-btn">Сыграть еще раз</button>`;
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

export function createModal(title, content) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const html = `
      <h1>${title}</h1>
      <div class="modal-content">${content}</div>
    `;

  modal.innerHTML = html;
}
