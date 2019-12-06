class Note {
    constructor(title, body, id=uuid()) {
        this.title = title;
        this.body = body;
        this.ID = id;
    }

    updateBody(newBody) {
        this.body = newBody;
        messageService.publish(this);
    }

    updateTitle(newTitle) {
        this.title = newTitle;
        messageService.publish(updateNote, this);
    }

    update() {
        notesAPI.updateNote(this)
            .then(newData => {
                // this.title = newData.title;
                // this.body = newData.body;
                messageService.publish(updateNote, this);
            });
    }
}
