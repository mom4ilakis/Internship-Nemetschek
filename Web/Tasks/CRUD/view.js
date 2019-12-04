class Page {
    constructor(target) {
        this.target = target;
        this.noteArea = document.createElement('div');
        this.titlesArea = document.createElement('div');
        this.note = new Note();
        this.notebook = null;
    }

    updateNoteTitle() {
        this.note.updateTitle(document.getElementById('noteTitle').value);
    }

    updateNoteBody() {
        this.note.updateBody(document.getElementById('noteBody').value);
    }

    clearNoteArea() {
        document.getElementById('noteTitle').getEventListeners().click.forEach(event => { event.remove();});
        document.getElementById('noteBody').
    }

    clearTitlesArea() {
        this.titlesArea.childNodes.forEach(node => {
            node.removeEventListener('click', this.loadNote);
        });
        this.titlesArea.innerHTML = '';
    }

    drawNote(note) {
        this.clearNoteArea();
        this.note = note;

        const titleElement = document.createElement('textarea');
        const bodyElement = document.createElement('textarea');

        titleElement.setAttribute('id', 'noteTitle');
        bodyElement.setAttribute('id', 'noteBody');

        titleElement.value = note.title;
        bodyElement.valuse = note.body;
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
        this.clearNoteArea();
        this.drawNote(this.dataset.id);
    }
}
