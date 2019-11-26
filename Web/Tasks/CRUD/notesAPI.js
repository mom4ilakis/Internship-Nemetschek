
const NOTEBOOK_KEY = 'notebook';
const notesAPI = {
    saveNote(note) {
        const newNotes = [...notesAPI.getNotes().filter((n) => n.ID !== note.ID), note];
        notebook.notes = newNotes;
        notesAPI.saveNotes(newNotes);
    },

    getNotes() {
        const stringRep = window.localStorage.getItem(NOTEBOOK_KEY);
        return stringRep ? JSON.parse(stringRep) : [];
    },

    saveNotes(notes) {
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(notes));
    },

    deleteNote(noteID) {
        const newNotes = [...notesAPI.getNotes().filter(note => note.ID !== noteID)];
        document.getElementById(noteID).removeEventListener('click');
        notesAPI.saveNotes(newNotes);
    },

    deleteNotes(notebook) {
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify([]));
        notebook.clear();
    },
};

class Notebook {
    constructor(target) {
        this.target = target;
        this.notes = Notebook.load();
    }

    clear() {
        this.notes.forEach(note => {
            document.getElementById(note.ID).removeEventListener('click');
        });

        this.notes = new Notebook();
    }

    static load() {
        return notesAPI.getNotes().map(n => new Note(n.title, n.content, n.ID));
    }

    render() {
        this.notes.forEach((note) => { note.render(this.target); });
    }
}

const pageContainer = document.getElementById('page-container');
const notesContainer = document.getElementById('note-list');
const saveBtn = document.getElementById('saveBtn');
const delBtn = document.getElementById('delBtn');
const delAllBtn = document.getElementById('delAllBtn');

const notebook = new Notebook(notesContainer);
const page = new Page(pageContainer);


page.loadNote(notebook.notes[0]);
page.render();
notebook.render();

saveBtn.addEventListener('click', () => {
    notesAPI.saveNote(page.note);
    notebook.render();
});

delBtn.addEventListener('click', () => {
    notesAPI.deleteNote(page.note.ID);
    notebook.render();
});
delAllBtn.addEventListener('click', () => {
    notesAPI.deleteNotes();
    notebook.render();
});
