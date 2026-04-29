const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = null;

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(filteredNotes = notes) {
    notesContainer.innerHTML = '';

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = '<p>No notes found.</p>';
        return;
    }

    filteredNotes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="note-actions">
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;

        notesContainer.appendChild(noteCard);
    });
}

addNoteBtn.addEventListener('click', () => {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!title || !content) {
        alert('Please fill all fields!');
        return;
    }

    if (editIndex === null) {
        notes.push({ title, content });
    } else {
        notes[editIndex] = { title, content };
        editIndex = null;
        addNoteBtn.textContent = 'Add Note';
    }

    saveNotes();
    renderNotes();

    noteTitle.value = '';
    noteContent.value = '';
});

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function editNote(index) {
    noteTitle.value = notes[index].title;
    noteContent.value = notes[index].content;
    editIndex = index;
    addNoteBtn.textContent = 'Update Note';
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
    );

    renderNotes(filteredNotes);
});

renderNotes();