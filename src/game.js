const colors = ["tomato", "skyblue", "violet", "orange", "palegreen"];
let favoriteScoreId = null;

export function finishGame(selectorTime, value, selectorForm1) {
  if (value) {
    selectorForm1.classList.remove("hide");
  }
  selectorTime.parentNode.classList.add("hide");
  board.innerHTML = `
    <h1 class="animate__animated">Ваш счет: ${value}</h1>
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

export function addLocalStorage(value) {
  if (value) {
    localStorage.setItem("score", value);
  }
}

export function getLocalStorage(selector, selectorTime, value) {
  if (localStorage.getItem("score")) {
    for (let i = 0; i < selector.length - 1; i++) {
      selector[i].classList.add("up");
      finishGame(selectorTime, value);
    }
  }
}

export class Result {
  static send(result) {
    return fetch(
      "https://game-with-authorization-default-rtdb.europe-west1.firebasedatabase.app/result.json",
      {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        result.id = response.name;
        return result;
      })
      .then((data) => {
        return (favoriteScoreId = data.id);
      })
      .then((data) => console.log(data));
  }

  static fetch(token) {
    return fetch(
      `https://game-with-authorization-default-rtdb.europe-west1.firebasedatabase.app/result.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }

        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            }))
          : [];
      });
  }

  static sortResult(results) {
    let sortArray = results.sort(byField("score")).reverse();
    let favoriteIndex = sortArray.findIndex(
      (item) => item.id == favoriteScoreId
    );
    let sortArrayFinal = sortArray.slice(0, 10);
    if (favoriteIndex > 10) {
      const lastRes = sortArray[favoriteIndex];
      sortArrayFinal.push(lastRes);
    }

    return sortArrayFinal;
  }

  static toListHTML(results) {
    return results.length
      ? `${results
          .map(
            (r, index) =>
              `<tr><td>${++index}</td><td>${r.score}</td><td>${
                r.user
              }</td><td>${new Date(r.data).toLocaleDateString()}</td></tr>`
          )
          .join("")}`
      : "<p>Ошибка!</p>";
  }
}

function byField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

export function sendScore(value, name, input, btnInput, btnModal) {
  if (value == 0) {
    console.log("Не отправлять");
    return;
  }
  const resultScore = {
    score: value,
    user: name.value,
    data: new Date().toJSON(),
  };

  Result.send(resultScore).then(() => {
    input.classList.add("hide");
    btnInput.classList.add("hide");
    btnModal.classList.add("show");
  });
}
