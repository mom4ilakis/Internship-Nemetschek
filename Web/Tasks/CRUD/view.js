class Page {
    constructor(target) {
        this.target = target;
        this.noteArea = document.createElement('div');
        this.titlesArea = document.createElement('div');
        this.target.append(this.noteArea, this.titlesArea);
        this.note = null;
        this.notebook = new Notebook();

        this.newNote = this.newNote.bind(this);
        this.updateNoteBody = this.updateNoteBody.bind(this);
        this.drawButton = this.drawButton.bind(this);
        this.drawNote = this.drawNote.bind(this);
        this.updateNoteTitle = this.updateNoteTitle.bind(this);
        this.drawNewButton = this.drawNewButton.bind(this);
        this.drawDeleteButton = this.drawDeleteButton.bind(this);
        this.clearNoteArea = this.clearNoteArea.bind(this);
        this.updateNoteBody = this.updateNoteBody.bind(this);
        this.updateNoteTitle = this.updateNoteTitle.bind(this);
        this.loadNote = this.loadNote.bind(this);
        this.deleteAllNotes = this.deleteAllNotes.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.notebook.load().then(() => {
            this.drawNotebook();
        });
    }

    updateNoteTitle() {
        this.note.updateTitle(document.getElementById('noteTitle').value);
        this.notebook.updateNote(this.note);
        this.drawNotebook();
    }

    updateNoteBody() {
        this.note.updateBody(document.getElementById('noteBody').value);
        this.notebook.updateNote(this.note);
    }

    clearNoteArea() {
        const title = document.getElementById('noteTitle');
        const body = document.getElementById('noteBody');

        if (title) {
            title.removeEventListener('change', this.updateNoteTitle);
            title.remove();
        }
        if (body) {
            body.removeEventListener('click', this.updateNoteBody);
            body.remove();
        }
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
        if(button){
            button.removeEventListener('click', func);
            button.remove();
        }
    }

    drawNewButton() {
        if(!document.getElementById('new-btn')) {
            this.drawButton('new-btn', this.newNote).innerHTML = 'New Note';
        }
    }

    removeNewButton() {
        Page.removeButton('new-btn', this.newNote);
    }

    drawDeleteButton() {
        if(!document.getElementById('del-btn')) {
            this.drawButton('del-btn', this.deleteNote).innerHTML = 'Delete Note';
        }
    }

    removeDeleteButton() {
        Page.removeButton('del-btn', this.deleteNote);
    }

    drawDeleteAllButton() {
        if(!document.getElementById('delAll-btn')) {
            this.drawButton('delAll-btn', this.deleteAllNotes).innerHTML = 'Delete All Notes';
        }  
    }

    removeDeleteAllButton() {
        Page.removeButton('delAll-btn', this.deleteAllNotes);
    }

    clearListArea() {
        this.titlesArea.childNodes.forEach(node => {
            node.removeEventListener('click', this.loadNote);
        });
        this.titlesArea.innerHTML = '';
    }

    drawNote(noteID) {
        this.clearNoteArea();
        this.note = this.notebook.notes[noteID];

        const titleElement = document.createElement('textarea');
        const bodyElement = document.createElement('textarea');

        titleElement.setAttribute('id', 'noteTitle');
        bodyElement.setAttribute('id', 'noteBody');

        titleElement.addEventListener('input', this.updateNoteTitle);
        bodyElement.addEventListener('input', this.updateNoteBody);

        titleElement.value = this.note.title;
        bodyElement.value = this.note.body;

        this.noteArea.append(titleElement, bodyElement);
        this.drawDeleteButton();
    }

    drawNotebook() {
        this.clearListArea();
        Object.keys(this.notebook.notes).forEach(key => {
            const title = document.createElement('li');
            title.dataset.id = key;
            title.addEventListener('click', this.loadNote);
            title.innerHTML = this.notebook.notes[key].title;
            this.titlesArea.append(title);
        });
        if (Object.keys(this.notebook.notes).length != 0 ) {
            this.drawDeleteAllButton();
        }
    }

    loadNote(element) {
        this.clearNoteArea();
        this.drawNote(element.currentTarget.dataset.id);
        this.drawDeleteButton();
    }

    newNote() {
        const note = new Note('Untitled', ' ');
        this.notebook.addNote(note);
        this.drawNotebook();
        this.drawNote(note.ID);
    }

    deleteNote() {
        this.clearNoteArea();
        this.notebook.deleteNote(this.note.ID);
        delete this.note;
        this.removeDeleteButton();
        this.removeDeleteAllButton();
        this.drawNotebook();
        
    }

    deleteAllNotes() {
        this.clearListArea();
        this.clearNoteArea();
        this.notebook.deleteAll();
        delete this.note;
        this.removeDeleteAllButton();
        this.removeDeleteButton();
    }
}
