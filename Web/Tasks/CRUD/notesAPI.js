const NOTEBOOK_KEY = 'notebook';
const notesAPI = {


    saveNote(note) {
        const oldNotes = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY));
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify({ ...oldNotes, [note.ID]: note }));
        return Promise.resolve(note);
    },

    getNotes() {
        return Promise.resolve(JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY)));
    },

    deleteNote(note) {
        const oldNotes = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY));
        delete oldNotes[note.ID];
        return Promise.resolve(null);
    },

    updateNote(note) {
        const oldNotes = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY));
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify({ ...oldNotes, [note.ID]: note }));
        return Promise.resolve(note);
    },
};
