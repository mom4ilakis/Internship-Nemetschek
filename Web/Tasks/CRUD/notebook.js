class Notebook {
    constructor(target) {
        this.notes = {};
        this.note = null;
        this.target = target || document.getElementById('notes-list');
    }

    renderTitles() {
        Object.keys(this.notes).forEach(key => {
            const element = document.createElement('li');
            element.setAttribute('id',this.notes[key].ID);
            element.addEventListener('click', this.notes[key].render);
            this.target.appendChild(element);
        });
    }

    loadNotes() {
        this.notes = notesAPI.getNotes()
            .then(notes => {
                const dict = {};
                // notes.map(n => { return new Note(n.title, n.content, n.ID); }).forEach(note=> {
                //     dict.set(note.ID, note);
                // });
                notes.forEach(note => {
                    dict[note.ID] = new Note(note.title, note.content, note.ID);
                });
                return dict;
            });
        this.renderTitles();
    }

    createNewNote() {
        this.note = new Note(this, 'Untitled', '');
        this.note.render();
        notesAPI.saveNote(this.note);
        this.notes[this.note.ID] = this.note;

    }

    recieve(note) {
        this.note = note;
        this.notes[note.ID] = note;
        // updating the storage
        notesAPI.saveNote(note);
        // getting the new notes
        this.loadNotes();
    }

    deleteAll() {
        Object.keys(this.notes).forEach( key =>{
            this.notes[key].deleteNote();
        });
        this.note = null;
    }

    deleteLoadedNote() {
        this.note.deleteNote();
    }
}
