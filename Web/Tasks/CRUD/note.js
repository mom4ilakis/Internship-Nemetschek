class Note {
    constructor(observer, title, content, target, id = uuid4()) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.observer = observer;
        this.target = target || document.getElementById('note-area');
        this.titleElement = document.createElement('textarea');
        this.bodyElement = document.createElementBy('bodyBox');
    }

    render() {
        this.titleElement.value = this.title;
        this.bodyElement.value = this.content;
        this.target.appendChild(this.titleElement);
        this.target.appendChild(this.bodyElement);
        this.addEvents();
    }

    addEvents() {
        this.titleElement.addEventListener('change', this.updateNoteAtr);
        this.bodyElement.addEventListener('change', this.updateNoteAtr);
    }

    removeEvents() {
        this.titleElement.removeEventListener('change', this.updateNoteAtr);
        this.bodyElement.removeEventListener('change', this.updateNoteAtr);
    }

    deleteElements() {
        this.removeEvents();
        this.titleElement.remove();
        this.bodyElement.remove();
    }

    deleteNote() {
        this.deleteElements();
    }

    updateNoteAtr() {
        if (this.title !== this.titleElement.value) {
            this.title = this.titleElement.value;
        }

        if (this.content !== this.bodyElement.value) {
            this.title = this.bodyElement.value;
        }

       debounce(this.notify(), 100, false);
    }

    notify() {
        this.observer.recieve(this);
    }
}
