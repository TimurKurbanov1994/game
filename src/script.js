import './styles/style.css'
import {startGame} from "./game"

const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");



// let time = 0;
let score = 0;
const colors = ["tomato", "skyblue", "violet", "orange", "palegreen"];

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")) {
        let time = parseInt(e.target.getAttribute("data-time"));
        screens[1].classList.add("up");
        board.innerHTML = "";
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
