//Complete the given scaffold to implement all the functionalities mentioned in the problem Statement.
const sentences = `The quick brown fox jumps over the lazy dog . Sphinx of black quartz, judge my vow . Pack my box with five dozen liquor jugs . How vexingly quick daft zebras jump !`;
//Fetching HTML elements reference
const speedEle = document.querySelector("#speed");
const inputEle = document.querySelector("#input");
const timerEle = document.querySelector("#timer");
const resultEle = document.querySelector("#result");
const accuracyEle = document.querySelector("#accuracy");
const sentenceEle = document.querySelector("#sentence");
const resetBtnEle = document.querySelector("#retry-btn");
const startBtnEle = document.querySelector("#start-btn");

//Initialising variables
let seconds = 30;
let timer;
let speed;
let accuracy;
let totalCorrectChar = 0;

//Start Test
function startTest() {
  startBtnEle.addEventListener("click", () => {
    sentenceEle.textContent = sentences;
    inputEle.disabled = false;
    startBtnEle.disabled = true;
    startTimer();
  });
}

//Start Timer Functionality
function startTimer() {
  timerEle.textContent = `00:${seconds.toString().padStart(2, 0)}`;
  timer = setInterval(() => {
    seconds--;
    if (seconds == 0) {
      endTimer();
    }
    timerEle.textContent = `00:${seconds.toString().padStart(2, 0)}`;
  }, 1000);
}

//End Timer Functionality
function endTimer() {
  clearInterval(timer);
  resultEle.style.display = "block";
  inputEle.disabled = true;
  speed = calSpeed(inputEle.value);
  accuracy = calAccuracy(inputEle.value);
  speedEle.textContent = speed;
  accuracyEle.textContent = accuracy;
}

//Calculating speed
function calSpeed(typedSentence) {
  let totalCorrectWords = 0;
  let typedSentenceArray = [];
  if (typedSentence != "") {
    typedSentenceArray = typedSentence.split(" ");
  }
  const wordArray = sentences.split(" ");
  const length = Math.min(wordArray.length, typedSentenceArray.length);

  for (let i = 0; i < length; i++) {
    if (wordArray[i] === typedSentenceArray[i]) {
      totalCorrectWords++;
    }
  }

  if (typedSentence != "") {
    return Math.floor((totalCorrectWords / 30) * 60);
  }

  return 0;
}

//Calculating accuracy
function calAccuracy(typedSentence) {
  const length = Math.min(sentences.length, typedSentence.length);

  for (let i = 0; i < length; i++) {
    if (typedSentence.charAt(i) === sentences.charAt(i)) {
      totalCorrectChar++;
    }
  }

  return ((totalCorrectChar / sentences.length) * 100).toFixed(2);
}

//Reset Test
function resetTest() {
  resetBtnEle.addEventListener("click", () => {
    seconds = 30;
    speed = 0;
    accuracy = 0;
    totalCorrectChar = 0;
    totalCorrectWords = 0;
    resultEle.style.display = "none";
    inputEle.value = "";
    startBtnEle.disabled = false;
  });
}

//Document Initial Function Calls
document.addEventListener("DOMContentLoaded", () => {
  startTest();
  resetTest();
});
