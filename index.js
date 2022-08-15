const addText = document.querySelector('.add-note__text');
const addButton = document.querySelector('.add-note__button');
const notes = document.querySelector('.notes');

document.addEventListener("DOMContentLoaded", function() {
    let data = JSON.parse(localStorage.getItem('myNotes'));

    for (let i = 0; i < data.notes.length; i++) {
        let listItem = createNewElement(data.notes[i]);
        notes.append(listItem);
    }
});

addButton.addEventListener("click", addNote);
addText.addEventListener("focus", addText => { addText.required = true; });

function addNote() {
    if (addText.value) {
        let listItem = createNewElement(addText.value);
        notes.append(listItem);
        addText.required = false;
        addText.value = '';
    }
    saveLocalStorage();
}

function createNewElement(element) {
    const listItem = document.createElement('li');

    const textarea = document.createElement('textarea');
    textarea.classList.add("notes__text");
    textarea.disabled = true;
    textarea.value = element;

    const editButton = document.createElement('button');
    editButton.classList.add("material-icons", "edit");
    editButton.innerHTML = "<i class='material-icons'>edit</i>";

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("material-icons", "delete");
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

    listItem.append(textarea);
    listItem.append(editButton);
    listItem.append(deleteButton);

    editButton.addEventListener("click", editNote);
    deleteButton.addEventListener("click", deleteNote);

    return listItem;
}

function saveLocalStorage() {
    let notesArr = [];

    for (let i = 0; i < notes.children.length; i++) {
        notesArr.push(notes.children[i].querySelector('textarea').value);
    }

    localStorage.removeItem('myNotes');
    localStorage.setItem('myNotes', JSON.stringify({notes: notesArr}));
}

function deleteNote() {
    const listItem = this.parentNode;
    listItem.remove();
    saveLocalStorage();
}

function editNote() {
    const editButton = this;
    const listItem = this.parentNode;
    const textarea = listItem.querySelector('textarea');
    const containsClass = listItem.classList.contains('editMode');
    textarea.disabled = false;

    if (containsClass) {
        textarea.value = textarea.value;
        editButton.classList.add("material-icons", "edit");
        editButton.innerHTML = "<i class='material-icons'>edit</i>";
        textarea.disabled = true;
        saveLocalStorage();
    } else {
        editButton.classList.add("material-icons", "save");
        editButton.innerHTML = "<i class='material-icons'>save</i>";
    }
    listItem.classList.toggle('editMode');
}