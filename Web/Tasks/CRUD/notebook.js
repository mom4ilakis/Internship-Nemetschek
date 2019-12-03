class Noteboook {
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
        this.notes = notesAPI.getNotes().map(n => {return new Noteboook(n.title, n.content, n.ID); });
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
