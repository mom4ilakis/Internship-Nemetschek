const uuid = require('./utils');

function debounce(func, wait, immidiate) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;
        let callNow = immidiate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;

            if (!immidiate) {
                func.apply(context, args);
            }
        }, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

if (!window) {
    var notesAPI = {};
}

class Note {
    constructor(title, body, id = uuid()) {
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
        debounce(window.notesAPI.saveNote(this));
    }

    delete() {
        window.notesAPI.deleteNote(this);
    }
}
module.exports = Note;
