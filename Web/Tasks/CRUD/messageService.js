const updateNote = 'note-update';
const deleteNote = 'note-delete';

class MessageService {
    constructor() {
        this.subscribers = {};
    }

    publish(type, newData) {
        this.subscribers[type].forEach(func => {
            func(newData);
        });
    }

    subscribe(type, callBack) {
        if (this.subscribers[type]) {
            this.subscribers[type].push(callBack);
        } else {
            this.subscribers[type] = [callBack];
        }
    }
}
