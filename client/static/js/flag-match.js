const flag1 = document.getElementById('flag-1')
const flag2 = document.getElementById('flag-2')
const flag3 = document.getElementById('flag-3')
const flag4 = document.getElementById('flag-4')
const country1 = document.getElementById('country-1')
const country2 = document.getElementById('country-2')
const country3 = document.getElementById('country-3')
const country4 = document.getElementById('country-4')

const cards = document.querySelectorAll('.card')
const nextBtn = document.getElementById('next');
const homeBtn = document.getElementById('back-btn')
const winMessage = document.getElementById('win-message');

let shuffledNames = []
let shuffledPhotos = []
let correctPairs = []
let selectedCards = []
let clickedCountryCard = null;
let clickedFlagCard = null;

function fetchData(){
    fetch("http://localhost:3000/data/flag-match")
    .then(res => res.json())
    .then(data => startGame(data))
}

function startGame(data){
    for ( let i = 0; i < 4 ; i++ ){
        correctPairs.push({country: data.correctName[i], flag: data.correctPhoto[i]})
    }

    console.log(correctPairs)
    shuffleData(data)

    country1.textContent = shuffledNames[0]
    country2.textContent = shuffledNames[1]
    country3.textContent = shuffledNames[2]
    country4.textContent = shuffledNames[3]
    flag1.src = shuffledPhotos[0]
    flag2.src = shuffledPhotos[1]
    flag3.src = shuffledPhotos[2]
    flag4.src = shuffledPhotos[3]

    cards.forEach(card => {
        card.addEventListener('click', cardClickHandler)
    })

    nextBtn.addEventListener('click', () => {
        // location.href = ''   should give next random question
        location.reload()
    })
    homeBtn.addEventListener('click', () => {
        // location.href = ''   should give next random question
        location.href = 'index.html'
    })
}

function shuffleData(data){
    shuffledNames = chance.shuffle(data.correctName)
    shuffledPhotos = chance.shuffle(data.correctPhoto)
}

function cardClickHandler() {
    if (this.classList.contains('country')){
        console.log('country')
        if (!clickedCountryCard){
            clickedCountryCard = this
            clickedCountryCard.style.outline = "thick solid black"
        }
    } else if (this.classList.contains('flag')){
        console.log('flag')
        if (!clickedFlagCard){
            clickedFlagCard = this
            clickedFlagCard.style.outline = "thick solid black"
        }
    } 
    
    if (clickedCountryCard && clickedFlagCard) {
        selectedCards = {
            country: clickedCountryCard.textContent.trim(),
            flag: getURL(clickedFlagCard)
        }
        clickedFlagCard.style.outline = "none";
        clickedCountryCard.style.outline = "none";
        console.log(selectedCards)
        if (compare(selectedCards)) {
            clickedCountryCard.remove()
            clickedFlagCard.remove()
            if (checkEmpty()) {
                nextBtn.style.display = 'block'
                homeBtn.style.display = 'block'
                winMessage.style.display = 'block'
            }
        }
        clickedCountryCard = null
        clickedFlagCard = null
    }
}

function getURL(card){
    const img = card.querySelector('img')
    return img.src
}

function compare(cardPair){
    for (correctPair of correctPairs){
        if (cardPair.country === correctPair.country && cardPair.flag === correctPair.flag){
            console.log('CORRECT PAIR')
            return true
        }
    }
}

function checkEmpty(){
    const remaining = document.querySelectorAll('.card')
    if (remaining.length === 0){
        return true
    } else {
        return false
    } 
}

fetchData()
