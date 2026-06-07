const hangmanStages = [
`
 +---+
 |   |
     |
     |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
     |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
 |   |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|   |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|\\  |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|\\  |
/    |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=========
`
];

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

let wins = Number(localStorage.getItem("wins")) || 0;
let losses = Number(localStorage.getItem("losses")) || 0;

const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const hangman = document.getElementById("hangman");
const wrongText = document.getElementById("wrong-guesses");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

function startGame() {
  selectedWord =
    words[Math.floor(Math.random() * words.length)];

  guessedLetters = [];
  wrongGuesses = 0;

  message.textContent = "";

  createKeyboard();
  updateDisplay();
}

function createKeyboard() {
  keyboard.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);

    const btn = document.createElement("button");

    btn.textContent = letter;

    btn.addEventListener("click", () => {
      handleGuess(letter.toLowerCase());
      btn.disabled = true;
    });

    keyboard.appendChild(btn);
  }
}

function handleGuess(letter) {

  guessedLetters.push(letter);

  if (!selectedWord.includes(letter)) {
    wrongGuesses++;
  }

  updateDisplay();
  checkGameStatus();
}

function updateDisplay() {

  const displayWord =
    selectedWord
      .split("")
      .map(letter =>
        guessedLetters.includes(letter)
          ? letter
          : "_"
      )
      .join(" ");

  wordDisplay.textContent = displayWord;

  hangman.textContent =
    hangmanStages[wrongGuesses];

  wrongText.textContent =
    `Wrong Attempts: ${wrongGuesses}/6`;

  document.getElementById("wins").textContent =
    wins;

  document.getElementById("losses").textContent =
    losses;
}

function checkGameStatus() {

  const won =
    selectedWord
      .split("")
      .every(letter =>
        guessedLetters.includes(letter)
      );

  if (won) {
    message.textContent =
      "🎉 Congratulations! You Won!";

    wins++;
    localStorage.setItem("wins", wins);

    disableKeyboard();
    updateDisplay();
  }

  if (wrongGuesses === 6) {

    message.textContent =
      `💀 Game Over! Word was "${selectedWord}"`;

    losses++;
    localStorage.setItem("losses", losses);

    disableKeyboard();
    updateDisplay();
  }
}

function disableKeyboard() {

  document
    .querySelectorAll(".keyboard button")
    .forEach(btn => {
      btn.disabled = true;
    });
}

restartBtn.addEventListener(
  "click",
  startGame
);

startGame();
