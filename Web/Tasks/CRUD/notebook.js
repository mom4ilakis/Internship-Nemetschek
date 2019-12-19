class Notebook {
    constructor() {
        this.notes = {};
        this.updateNote = this.updateNote.bind(this);
    }

    updateNote(note) {
        this.notes[note.ID] = note;
    }

    load() {
        return notesAPI.getNotes()
            .then(notes => {
                const newNotes = {};
                Object.keys(notes).forEach(key => {
                    newNotes[notes[key].ID] = new Note(notes[key].title, notes[key].body, notes[key].ID);
                });
                this.notes = newNotes;
            });
    }

    addNote(newNote) {
        this.notes[newNote.ID] = newNote;
        newNote.save();
    }

    deleteNote(noteID) {
        this.notes[noteID].delete();
        delete this.notes[noteID];
    }

    deleteAll() {
        Object.keys(this.notes).forEach(key => {
            this.deleteNote(key);
        });
    }
}
module.exports = Notebook;
