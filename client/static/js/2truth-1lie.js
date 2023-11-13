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

const button1 = document.getElementById('btn-1')
const button2 = document.getElementById('btn-2')
const button3 = document.getElementById('btn-3')

const question = document.getElementById('question')
const homeBtn = document.getElementById('back-btn')
//////////////////////////////////////////////////////////////////////////


const nextQuestionBtnC = document.getElementById('create-score');
const nextQuestionBtnI = document.getElementById('next-btn-incorrect');

//////////////////////////////////////////////////////////////////////////

const buttons = document.querySelectorAll('.answer-button')

let shuffledAnswers = []


function fetchData(){
    fetch("http://localhost:3000/data/two-truth-one-lie")
    .then(res => res.json())
    .then(data => startGame(data))
}

function startGame(data){

    shuffleData(data)
    // console.log(data)
    // console.log(shuffledAnswers)
    button1.textContent = shuffledAnswers[0].text 
    button2.textContent = shuffledAnswers[1].text
    button3.textContent = shuffledAnswers[2].text
    
    button1.bool = shuffledAnswers[0].correct
    button2.bool = shuffledAnswers[1].correct
    button3.bool = shuffledAnswers[2].correct

    buttons.forEach(button => {
        button.addEventListener('click', buttonClickHandler)
    })


///////////////////////////////////////////////////////////////////////////////
    nextQuestionBtnC.addEventListener('click', () => {
        location.reload() // should load up a ranomdly selected question and pass current score onto it
    })

    nextQuestionBtnI.addEventListener('click', () => {
        location.reload() 
    })

///////////////////////////////////////////////////////////////////////////////
    homeBtn.addEventListener('click', () => {
        location.href = 'index.html'
    })
}

function shuffleData(data){
    shuffledAnswers = chance.shuffle(data.answers)
}

function buttonClickHandler(){
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    if (this.bool === true){
        this.classList.add("correct");
        question.textContent = 'Congratulations, You guessed right!'
        nextQuestionBtnC.style.display = 'block'
        const next = document.querySelector("#create-score");
        next.addEventListener('click', createNewScore);
    } else {
        this.classList.add("wrong");
        question.textContent = 'Unlucky, thats incorrect!'
        nextQuestionBtnI.style.display = 'block'
        // return false

    }
}

fetchData()


