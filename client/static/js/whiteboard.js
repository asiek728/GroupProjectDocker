const addNoteBtn = document.querySelector('#addNoteBtn')
const container = document.querySelector('#container');
const backButton = document.getElementById('back-btn')

addNoteBtn.addEventListener('click', addNote)
const homeBtn = document.getElementById('home-btn')

function fetchNotes() {
  fetch("https://reddy-1-1-be.onrender.com/whiteboard")
    .then(resp => resp.json())
    .then(data => {
      addOldNotes(data)
    })
}

function addOldNotes(data) {
  const oldNotes = data;
  oldNotes.forEach(oldNote => {
    addNote(oldNote);
  });
}

function addNote(oldNote) {
  const deleteBtn = document.createElement("img");
  deleteBtn.setAttribute("src", "../../static/img/bin.png");
  deleteBtn.addEventListener('click', removeNote, { once: true })

  const editBtn = document.createElement("img");
  editBtn.setAttribute("src", "../../static/img/edit.png");
  editBtn.addEventListener('click', editNote)

  const text = document.createElement("p");
  text.setAttribute("contenteditable", "true")
  text.textContent = oldNote.text || " ";
  let randomColour = Math.floor(Math.random() * 16777215).toString(16);

  const note = document.createElement("div");
  note.setAttribute("class", "box");
  note.appendChild(deleteBtn);
  note.appendChild(editBtn);
  note.appendChild(text);
  note.style.backgroundColor = "#" + randomColour;
  container.appendChild(note);

  // homeBtn.addEventListener('click', () => {
  //   location.href = 'index.html'
  // })   needs to be added/fixed to work
  

  if (!oldNote.text) {
    console.log("new note")
    createNote();
  }
}

async function createNote(e) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: " "
    })
  }
  const response = await fetch('http://localhost:3000/whiteboard', options)
  if (response.status === 201) {
    e.target.note.value = " "
  }
}

const removeNote = (e) => {
  e.currentTarget.parentNode.remove();
}

function editNote(e) {
  // let newNote = e.currentTarget.parentNode.getElementsByTagName("P")[0].innerHTML;
  // alert(newNote);

  // const http = require("https");
  // const url = 'http://localhost:3000/whiteboard';

  // const options = {
  //   method: 'PATCH',
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  // };

  // let result = '';
  // const req = http.request(url, options, (res) => {
  //   console.log(res.statusCode);

  //   res.setEncoding('utf8');
  //   res.on('newNote', (chunk) => {
  //     result += chunk;
  //   });

  //   res.on('end', () => {
  //     console.log(result);
  //   });
  // });

  // req.on('error', (e) => {
  //   console.error(e);
  // });

  // req.write(newNote);
  // req.end();





  // const options = {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     text: newNote
  //   })
  // }
  // const response = await fetch('http://localhost:3000/whiteboard', options)
  // if (response.status === 201) {
  //   e.target.note.value = newNote;
  // }
}

backButton.addEventListener('click', () => {
  location.href = 'index.html'
})

fetchNotes();
