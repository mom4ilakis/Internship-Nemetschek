function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
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
module.exports = Note;