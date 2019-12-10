class Note {
    constructor(title, body, id=uuid()) {
        this.title = title;
        this.body = body;
        this.ID = id;
    }

    updateBody(newBody) {
        this.body = newBody;
        this.save();
    }

    updateTitle(newTitle) {
        this.title = newTitle;
        this.save();
    }

    save() {
        debounce(notesAPI.saveNote(this));
    }

    delete() {
        notesAPI.deleteNote(this);
    }
}
