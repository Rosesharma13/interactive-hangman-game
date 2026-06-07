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
let selectedHint = "";
let selectedCategory = "";

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
const hintBtn = document.getElementById("hint-btn");
const hintText = document.getElementById("hint");
const categoryText = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");
const newGameBtn = document.getElementById("new-game-btn");

function startGame() {

  const difficulty =
    difficultySelect.value;

  const words =
    wordData[difficulty];

  const randomWord =
    words[
      Math.floor(
        Math.random() * words.length
      )
    ];

  selectedWord =
    randomWord.word;

  selectedHint =
    randomWord.hint;

  selectedCategory =
    randomWord.category;

  guessedLetters = [];
  wrongGuesses = 0;

  hintText.textContent = "";

  message.textContent = "";

  categoryText.textContent =
    `Category: ${selectedCategory}`;

  createKeyboard();

  updateDisplay();
}

function createKeyboard() {

  keyboard.innerHTML = "";

  for (let i = 65; i <= 90; i++) {

    const letter =
      String.fromCharCode(i);

    const btn =
      document.createElement("button");

    btn.textContent =
      letter;

    btn.addEventListener(
      "click",
      () => {
        handleGuess(
          letter.toLowerCase()
        );

        btn.disabled = true;
      }
    );

    keyboard.appendChild(btn);
  }
}

function handleGuess(letter) {

  guessedLetters.push(letter);

  if (
    !selectedWord.includes(letter)
  ) {
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
          ? letter.toUpperCase()
          : "_"
      )
      .join(" ");

  wordDisplay.textContent =
    displayWord;

  hangman.textContent =
    hangmanStages[wrongGuesses];

  wrongText.textContent =
    `Wrong Attempts: ${wrongGuesses}/6`;

  document.getElementById(
    "wins"
  ).textContent = wins;

  document.getElementById(
    "losses"
  ).textContent = losses;
}

function checkGameStatus() {

  const won =
    selectedWord
      .split("")
      .every(letter =>
        guessedLetters.includes(letter)
      );

  if (won) {

    wins++;

    localStorage.setItem(
      "wins",
      wins
    );

    message.textContent =
      "🎉 Congratulations! You Won!";

    disableKeyboard();

    updateDisplay();
  }

  if (wrongGuesses >= 6) {

    losses++;

    localStorage.setItem(
      "losses",
      losses
    );

    message.textContent =
      `💀 Game Over! Word was "${selectedWord.toUpperCase()}"`;

    disableKeyboard();

    updateDisplay();
  }
}

function disableKeyboard() {

  document
    .querySelectorAll(
      ".keyboard button"
    )
    .forEach(btn => {
      btn.disabled = true;
    });
}

hintBtn.addEventListener(
  "click",
  () => {

    hintText.textContent =
      `💡 Hint: ${selectedHint}`;
  }
);

restartBtn.addEventListener(
  "click",
  startGame
);

newGameBtn.addEventListener(
  "click",
  startGame
);

difficultySelect.addEventListener(
  "change",
  startGame
);

startGame();
