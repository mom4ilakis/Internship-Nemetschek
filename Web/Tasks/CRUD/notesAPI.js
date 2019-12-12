const NOTEBOOK_KEY = 'notebook';
window.notesAPI = {
    saveNote(note) {
        const oldNotes = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY));
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify({ ...oldNotes, [note.ID]: note }));
        return Promise.resolve(note);
    },

    getNotes() {
        return Promise.resolve(JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY)));
    },

    deleteNote(note) {
        const notes = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY));
        delete notes[note.ID];
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(notes));
        return Promise.resolve(null);
    },

    updateNote(note) {
        const oldNotes = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY));
        window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify({ ...oldNotes, [note.ID]: note }));
        return Promise.resolve(note);
    },
};
