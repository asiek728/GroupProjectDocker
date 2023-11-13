const btn = document.querySelector('#submitLetter');
const wordToGuessSection = document.querySelector('#wordToGuessSection');
const userInputSection = document.querySelector('#userInputSection');
const wrongLettersList = document.querySelector('#wrongLettersList');
const letterGuessed = document.querySelector('#guessLetter');
const heading = document.querySelector('h1');
const startAgainBtn = document.getElementById('start-again');
const wrongLettersSection = document.querySelector('#wrongLettersSection');
const hangmanSection = document.querySelector('#hangmanSection');
const upperSection = document.querySelector('#upperSection');
const backButton = document.getElementById('back-btn')

let hangmanImage = document.querySelector('#hangman');
let wrongLetters = [];
let guessedLetters = [];
let images = new Array("./static/img/hangman/hm1.png", "./static/img/hangman/hm2.png", "./static/img/hangman/hm3.png", "./static/img/hangman/hm4.png", "./static/img/hangman/hm5.png", "./static/img/hangman/hm6.png", "./static/img/hangman/hm7.png", "./static/img/hangman/hm8.png");
let word = "";

fetchQuestion();
btn.addEventListener('click', checkLetter)

backButton.addEventListener('click', () => {
    location.href = 'index.html'
})

function fetchQuestion() {
    fetch("http://localhost:3000/data/hangman")
        .then(resp => resp.json())
        .then(data => {
            heading.textContent = data.question;
            word = data.correct.toUpperCase();
            addLetterDivs();
            checkForSpaces();
        })
}

function addLetterDivs() {
    for (let i = 0; i < word.length; i++) {
        createLetterDivs();
    }
}

function createLetterDivs() {
    const letterDiv = document.createElement("div");
    letterDiv.setAttribute("class", "letterDiv");
    let text = document.createElement("p");
    text.textContent = "_";
    letterDiv.appendChild(text);
    wordToGuessSection.appendChild(letterDiv);
}

function checkForSpaces() {
    for (let i = 0; i < word.length; i++) {
        if (word[i] == " ") {
            addCorrectLetter(i, " ");
        }
    }
}

function checkLetter() {
    let found = false;
    let guess = letterGuessed.value.toUpperCase();
    if (!guessedLetters.includes(guess) && !wrongLetters.includes(guess) && guess.match(/[a-z]/i)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] == guess) {
                found = true;
                addCorrectLetter(i, guess);
            }
        }
        if (!found) {
            addWrongLetter(guess)
        }
    }
    letterGuessed.value = "";
}

function addCorrectLetter(letterID, correctLetter) {
    guessedLetters.push(correctLetter);
    let div = wordToGuessSection.getElementsByTagName('div')[letterID];
    div.getElementsByTagName("p")[0].textContent = correctLetter;
    div.style.backgroundColor = '#DDD057';
    checkResults();
}

function addWrongLetter(wrongLetter) {
    wrongLetters.push(wrongLetter);
    const letterDiv = document.createElement("div");
    letterDiv.setAttribute("class", "letterDiv");
    const text = document.createElement("p");
    text.textContent = wrongLetter;
    letterDiv.appendChild(text);
    wrongLettersList.appendChild(letterDiv);
    hangmanImage.setAttribute("src", images[wrongLetters.length]);
    checkResults();
}

function checkResults() {
    if (guessedLetters.length === word.length) {
        heading.textContent = "Congrats! You won! Do you want to play again?"
        cleanScreenCorrect();
    }
    if (wrongLetters.length === 7) {
        heading.textContent = "You lost! Do you want to play again?"
        cleanScreen();
    }
}

function cleanScreen() {
    const newGameBtnYes = document.createElement("button");
    const newGameBtnNo = document.createElement("button");
    newGameBtnYes.textContent = "Yes"
    newGameBtnYes.setAttribute("class", "newGameBtn");
    newGameBtnNo.textContent = "No"
    newGameBtnNo.setAttribute("class", "newGameBtn");

    newGameBtnYes.addEventListener('click', () => {
        location.reload()
    })
    newGameBtnNo.addEventListener('click', () => {
        location.href = '../../index.html'
    })
    upperSection.appendChild(newGameBtnYes);
    upperSection.appendChild(newGameBtnNo);
}


////////////////////////////////////////////////////////////////////////
function cleanScreenCorrect() {
    const newGameBtnYes = document.createElement("button");
    const newGameBtnNo = document.createElement("button");
    newGameBtnYes.textContent = "Yes"
    newGameBtnYes.setAttribute("class", "newGameBtn");
    newGameBtnYes.setAttribute("id", "create-score");

    newGameBtnNo.textContent = "No"
    newGameBtnNo.setAttribute("class", "newGameBtn");
    newGameBtnYes.setAttribute("id", "create-score");

    newGameBtnYes.addEventListener('click', () => {
        location.reload()
    })
    newGameBtnNo.addEventListener('click', () => {
        location.href = '../../index.html'
    })
    upperSection.appendChild(newGameBtnYes);
    upperSection.appendChild(newGameBtnNo);

    const next = document.querySelector("#create-score");
    next.addEventListener('click', createNewScore);
}




const next = document.querySelector("#create-score");
next.addEventListener('click', createNewScore);

async function createNewScore(e) {
    e.preventDefault()

    const score = {
        id: e.length + 1,
        score: e.length + 1
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(score)
    }

    const response = await fetch("http://localhost:3000/total", options);

    if (response.ok) {
        // alert("Score added.");
    }
}

////////////////////////////////////////////////////////////////////////
