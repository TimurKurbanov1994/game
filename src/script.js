import "./styles/style.css";
import { createRandomCircle, finishGame, createModal } from "./game";

const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const btnModal = document.querySelector(".gradient-button");

let time = 0;
let score = 0;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    if (time < 10) {
      timeEl.textContent = `00:0${time}`;
    } else {
      timeEl.textContent = `00:${time}`;
    }
    startGame(time);
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

// btnModal.addEventListener("click", (e) => {
//   e.preventDefault();
//   createModal("asdad", "adsasd");
// });

createModal("asdad", "adsasd");

function startGame() {
  board.innerHTML = "";
  setInterval(decreaseTime, 1000);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame(timeEl, score);
    btnModal.style.display = "block";
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.textContent = `00:${value}`;
}
