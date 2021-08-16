const allNotes = document.querySelectorAll(".note_layout li a");
const note_layout = document.querySelector(".note_layout");
const inputButton = document.querySelector(".input");
const searchButton = document.getElementById("search");
const addButton = document.getElementById("search");
const addMovieModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const confirmAddMovieButton = document.getElementById("confirm_button");
const title = document.getElementById("title");
const noteText = document.getElementById("note_text");
const deleteModal = document.getElementById("delete-modal");
const cancelModalButton =
  document.querySelector(".modal_action").firstElementChild;

const notes = [];

addButton.addEventListener("click", showAddModal);

backDrop.addEventListener("click", backdropClickHandler);

cancelModalButton.addEventListener("click", cancelMovieHandler);

function cancelMovieHandler() {
  clearInput();
  toggleBackdrop();
  removeAddModal();
}

function backdropClickHandler() {
  removeAddModal();
  clearInput();
  closeMovieDeletionModal();
}

function deleteNote(noteId) {
  let index = 0;

  for (const note of notes) {
    if (noteId === note.id) {
      break;
    }
    index++;
  }

  notes.splice(index, 1);
  const noteList = document.getElementById("note_list");
  noteList.removeChild(noteList.children[index]);
  closeMovieDeletionModal();
}

function closeMovieDeletionModal() {
  toggleBackdrop();
  deleteModal.classList.remove("visible");
}

function deleteNoteHandler(id) {
  deleteModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionButton = deleteModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteModal.querySelector(".btn--danger");

  cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);
  cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);

  confirmDeletionButton.addEventListener("click", deleteNote.bind(null, id));
}

function renderNewElement(id, title, noteTitle) {
  const noteElement = document.createElement("li");
  noteElement.innerHTML = `
    <div class="close_image">
      <i class="fa fa-close"></i>
    </div>
    <a href="#" contenteditable="true">
      <h2>${title}</h2>
      <p>${noteTitle}</p>
    </a>
  `;

  noteElement
    .querySelector(".close_image")
    .addEventListener("click", deleteNoteHandler.bind(null, id));
  const noteList = document.getElementById("note_list");
  noteList.append(noteElement);
}

confirmAddMovieButton.addEventListener("click", function () {
  const note = {
    id: Math.random().toString(),
    title: title.value,
    note: noteText.value,
  };

  notes.push(note);
  renderNewElement(note.id, note.title, note.note);
  removeAddModal();
  toggleBackdrop();
  clearInput();
});

function toggleBackdrop() {
  backDrop.classList.toggle("visible");
}

function showAddModal() {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
}

function removeAddModal() {
  addMovieModal.classList.remove("visible");
}

function clearInput() {
  title.value = "";
  noteText.value = "";
}

for (item of allNotes) {
  item.setAttribute("contenteditable", "true");
}

allNotes.forEach((item) => {
  item.addEventListener("keyup", () => {
    const note_title = item.querySelector("h2").textContent;
    const note_content = item.querySelector("p").textContent;
    const item_key =
      "list_" +
      Array.prototype.indexOf.call(
        item.parentNode.parentNode.children,
        item.parentNode
      );

    const data = {
      title: note_title,
      content: note_content,
    };

    window.localStorage.setItem(item_key, JSON.stringify(data));
  });
});

allNotes.forEach(function (value, index) {
  const data = JSON.parse(window.localStorage.getItem("list_" + index));

  if (data !== null) {
    note_title = data.title;
    note_content = data.content;

    value.querySelector("h2").textContent = note_title;
    value.querySelector("p").textContent = note_content;
  }
});
