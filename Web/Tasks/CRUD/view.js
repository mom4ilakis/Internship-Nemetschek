class Page {
    constructor(target) {
        this.target = target;
        this.noteArea = document.createElement('div');
        this.titlesArea = document.createElement('div');
        this.note = new Note('Untitled', '');
        this.notebook = new Notebook();
        this.notebook.addNote(this.note);

        let element = document.createElement('textarea');
        element.setAttribute('id', 'noteTitle');
        this.noteArea.append(element);
        element = document.createElement('textarea');
        element.setAttribute('id', 'noteBody');
        this.noteArea.append(element);

        this.target.append(this.noteArea);
        this.target.append(this.titlesArea);

        this.newNote = this.newNote.bind(this);
        this.updateNoteBody = this.updateNoteBody.bind(this);
        this.drawButton = this.drawButton.bind(this);
        this.drawNote = this.drawNote.bind(this);
        this.updateNoteTitle = this.updateNoteTitle.bind(this);
        this.drawNewButton = this.drawNewButton.bind(this);
        this.drawDeleteButton = this.drawDeleteButton.bind(this);
    }

    updateNoteTitle() {
        this.note.updateTitle(document.getElementById('noteTitle').value);
    }

    updateNoteBody() {
        this.note.updateBody(document.getElementById('noteBody').value);
    }

    static clearNoteArea() {
        document.getElementById('noteTitle').getEventListeners().change.forEach(event => { event.remove(); });
        document.getElementById('noteBody').getEventListeners().change.forEach(event => { event.remove(); });
    }

    drawButton(id, callbackFunc) {
        const button = document.createElement('button');
        button.setAttribute('id', id);
        button.addEventListener('click', callbackFunc);
        this.target.append(button);
        return button;
    }

    static removeButton(id, func) {
        const button = document.getElementById(id);
        button.removeEventListener('click', func);
        button.remove();
    }

    drawNewButton() {
        this.drawButton('new-btn', this.newNote).innerHTML = 'New Note';
    }

    removeNewButton() {
        Page.removeButton('new-btn', this.newNote);
    }

    drawDeleteButton() {
        this.drawButton('del-btn', this.deleteNote).innerHTML = 'Delete Note';
    }

    removeDeleteButton() {
        Page.removeButton('del-btn', this.deleteNote);
    }

    drawDeleteAllButton() {
        this.drawButton('delAll-btn', this.deleteAllNotes).innerHTML = 'Delete All Notes';
    }

    removeDeleteAllButton() {
        Page.removeButton('delAll-btn', this.deleteAllNotes);
    }

    clearTitlesArea() {
        this.titlesArea.childNodes.forEach(node => {
            node.removeEventListener('click', this.loadNote);
        });
        this.titlesArea.innerHTML = '';
    }

    drawNote(noteID) {
        Page.clearNoteArea();
        this.note = this.notebook.notes[noteID];

        const titleElement = document.createElement('textarea');
        const bodyElement = document.createElement('textarea');

        titleElement.setAttribute('id', 'noteTitle');
        bodyElement.setAttribute('id', 'noteBody');

        titleElement.value = this.note.title;
        bodyElement.valuse = this.note.body;
    }

    drawNotebook() {
        this.clearTitlesArea();

        notesAPI.getNotes().then(notes => {
            notes.forEach(note => {
                const title = document.createElement('li');
                title.dataset.id = note.id;
                title.addEventListener('click', this.loadNote);
                title.innerHTML = note.title;
                this.titlesArea.append(title);
            });
        });
    }

    loadNote() {
        Page.clearNoteArea();
        this.drawNote(this.dataset.id);
    }


    newNote () {
        const note = new Note('Untitled', ' ');
        note.update();
        this.drawNote(note.ID);
    }
}
