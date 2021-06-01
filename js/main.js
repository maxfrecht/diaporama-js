const imgArray = [
  { src: "./img/1.jpg", legend: "Une forêt super jolie" },
  { src: "./img/2.jpg", legend: "Le crépuscule en montagne" },
  { src: "./img/3.jpg", legend: "Petite chaumière à vendre asap" },
  { src: "./img/4.jpg", legend: "Plage de galet magnifique" },
];

const diaporamaDivElement = document.querySelector("#diaporama");
const ImgDiaporamaElement = document.querySelector("#img");
const arrowSpanElements = document.querySelectorAll(".btn");
const buttonPlayElement = document.querySelector("button");
const navToButtonsElement = document.querySelectorAll(".navto");

const legendPElement = document.createElement("p");
legendPElement.innerHTML = imgArray[0].legend;
diaporamaDivElement.appendChild(legendPElement);
buttonActive(0)

let timeOut;
let isTimeOut = false;

buttonPlayElement.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Play") {
    e.target.innerHTML = "Pause";
    e.target.style.backgroundColor = "orange";
    isTimeOut = !isTimeOut;
    move()
    timeOut = setInterval(() => {
      move();
    }, 2000);
  } else {
    e.target.innerHTML = "Play";
    e.target.style.backgroundColor = "green";
    isTimeOut = !isTimeOut;
    clearInterval(timeOut);
  }
});

arrowSpanElements.forEach((span) => {
  if (span.innerHTML.search(/back/) !== -1) {
    span.addEventListener("click", () => {
      if (isTimeOut) {
        clearInterval(timeOut);
        isTimeOut = !isTimeOut;
        buttonPlayElement.innerHTML = "Play";
        buttonPlayElement.style.backgroundColor = "green";
      }
      move(false);
    });
  } else {
    span.addEventListener("click", () => {
      if (isTimeOut) {
        clearInterval(timeOut);
        isTimeOut = !isTimeOut;
        buttonPlayElement.innerHTML = "Play";
        buttonPlayElement.style.backgroundColor = "green";
      }
      move();
    });
  }
});

navToButtonsElement.forEach((button, index) => {
  button.addEventListener("click", () => {
    buttonActive(index);
    if (isTimeOut) {
      clearInterval(timeOut);
      isTimeOut = !isTimeOut;
      buttonPlayElement.innerHTML = "Play";
      buttonPlayElement.style.backgroundColor = "green";
    }
    fade();
    setTimeout(() => {
      ImgDiaporamaElement.src = imgArray[index].src;
      legendPElement.innerHTML = imgArray[index].legend;
    }, 300);
  });
});

function move(next = true) {
  fade();
  setTimeout(() => {
    LoopArrayScope : for (let index = 0; index < imgArray.length; index++) {
      if (ImgDiaporamaElement.getAttribute("src") === imgArray[index].src) {
        if (next ? index === imgArray.length - 1 : index === 0) {
          buttonActive(next ? 0 : imgArray.length - 1);
          next
            ? (ImgDiaporamaElement.src = imgArray[0].src)
            : (ImgDiaporamaElement.src = imgArray[imgArray.length - 1].src);
          next
            ? (legendPElement.innerHTML = imgArray[0].legend)
            : (legendPElement.innerHTML = imgArray[imgArray.length - 1].legend);
          break LoopArrayScope;
        } else {
          buttonActive(next ? index + 1 : index - 1);

          next
            ? (ImgDiaporamaElement.src = imgArray[index + 1].src)
            : (ImgDiaporamaElement.src = imgArray[index - 1].src);
          next
            ? (legendPElement.innerHTML = imgArray[index + 1].legend)
            : (legendPElement.innerHTML = imgArray[index - 1].legend);
          break LoopArrayScope;
        }
      }
    }
  }, 500);
}

function fade() {
  ImgDiaporamaElement.classList.add("fade");
  setTimeout(() => {
    ImgDiaporamaElement.classList.remove("fade");
  }, 500);
}

function buttonActive(index) {
  navToButtonsElement.forEach((button) => {
    button.classList.remove("active");
  });

  navToButtonsElement[index].classList.add("active");
}
