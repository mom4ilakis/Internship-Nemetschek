class Page {
    constructor(cont) {
        this.container = cont;
        this.note = null;
    }

    updateNoteTitle(newTitle) {
        this.note.updateTitle(newTitle);
    }

    updateNoteContent(newContent) {
        this.note.updateContent(newContent);
    }

    loadNote(note) {
        this.note = note;
        this.render();
    }

    extractNote(titleElement, bodyElement) {
        this.note = new Note(titleElement.value, bodyElement.value);


    }


    render() {
        this.container.innerHTML = '';
        const title = document.createElement('input');
        const body = document.createElement('textarea');

        title.setAttribute('type', 'text');


        if (this.note) {
            title.value = this.note.title;
            title.addEventListener('change', () => { this.updateNoteTitle(title.value); });

            body.value = this.note.content;
            body.addEventListener('change', () => { this.updateNoteContent(body.value); });
        }

        this.extractNote(title, body);

        this.container.appendChild(title);
        this.container.appendChild(body);
    }
}
