import "./styles/style.css";
import {
  createRandomCircle,
  finishGame,
  getLocalStorage,
  Result,
  sendScore,
} from "./game";
import { authWithEmailAndPass } from "./auth";

const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const modal = document.querySelector(".modal");
const form = modal.querySelector("#auth_form");
const btnSend = document.querySelector("#send_result");
const modalClose = document.querySelector(".modal__close");
const formSend = document.querySelector("#send_form");
const inputName = formSend.querySelector("#inputName");
const showModal = document.querySelector("#showModal");
const showResult = document.querySelector("#show_result");

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

modalClose.addEventListener("click", () => {
  modal.classList.add("hide");
});

btnSend.addEventListener("click", () => {
  sendScore(score, inputName, inputName, btnSend, showModal);
});

showModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hide");
});

showResult.addEventListener("click", (e) => {
  e.preventDefault();
  authWithEmailAndPass("t@a.ru", "123456")
    .then(Result.fetch)
    .then(Result.sortResult)
    .then(Result.toListHTML)
    .then(showResultTable);
});

getLocalStorage(screens, timeEl, localStorage.getItem("score"));

form.addEventListener("submit", authFormHandler, { once: true });

function authFormHandler(event) {
  event.preventDefault();
  const email = event.target.querySelector("#email").value,
    pass = event.target.querySelector("#pass").value;

  console.log(email, pass);
  authWithEmailAndPass(email, pass);
}

function startGame() {
  board.innerHTML = "";
  setInterval(decreaseTime, 1000);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame(timeEl, score, formSend);
    time = null;
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

function showResultTable(content) {
  modal.classList.add("hide");
  document.querySelector(".animate__animated").classList.add("hide");

  board.innerHTML = `<table class="table"> 
<tr><th>№</th><th>Счет</th><th>Имя</th><th>Дата</th></tr>
${content}</table>`;
}
