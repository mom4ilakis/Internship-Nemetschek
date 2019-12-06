class Notebook {
    constructor(notes) {
        this.notes = notes || {};
        messageService.subscribe('note-update', this.updateNote);
        this.refresh();
    }

    updateNote(note) {
        this.notes[note.id] = note;
        debounce(notesAPI.saveNote(note));
    }

    refresh() {
        this.notes = notesAPI.getNotes().then(notes => {
            const newNotes = {};
            Object.keys(notes).forEach(key => {
                newNotes[notes[key].ID] = new Note(notes[key].title, notes[key].body, notes[key].msgService, notes[key].ID);
            });
            return newNotes;
        }) || {};
    }

    addNote(newNote) {
        notesAPI.saveNote(newNote);
        this.notes[newNote.ID] = newNote;
    }

    deleteNote(noteID) {
        notesAPI.deleteNote(this.notes[noteID]).then(() => {
            delete this.notes[noteID];
        });
    }
}
