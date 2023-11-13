
//////////////////////////////////////////////////////////////////////
//for the home page

let score = 0
fetchScore()

const viewScore = document.querySelector("#view-score");
viewScore.addEventListener('click', printScore);

function fetchScore() {
    fetch("http://localhost:3000/total")
        .then(resp => resp.json())
        .then(data => {
            score = data.length -1;
            const markup = `<h2>Your score for today is ${score}!</h2>`
            document.querySelector(`h2`).insertAdjacentHTML('beforeend', markup)
        })
}

function printScore() {
    // alert(`Your score is ${score}`)
    console.log(`Your score is ${score}`)
}

//popip animations
let popup = document.getElementById("popup");

const openPopup = () => {
    popup.classList.add("open-popup");
}

const closePopup = () => {
    popup.classList.remove("open-popup");
}

//////////////////////////////////////////////////////////////////
