const NOTEBOOK_KEY = 'notebook';
const notesAPI = {

    saveNotes(notebook) {
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(notebook));
    },

    saveNote(note) {
        const oldNotes = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY));
        const nt = {};
        nt[note.ID.toString()] = note;
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify({ ...oldNotes, nt }));
    },

    getNotes() {
        return new Promise(JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY)));
    },

    deleteAll() {
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify({}));
    },
};
