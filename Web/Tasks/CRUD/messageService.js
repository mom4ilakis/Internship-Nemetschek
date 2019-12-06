const updateNote = 'note-update';
class MessageService {
    constructor() {
        this.subscribers = {};
    }

    publish(type, newData) {
        this.subscribers[type](newData);
    }

    subscribe(type, callBack) {
        if (this.subscribers[type]) {
            this.subscribers[type].push(callBack);
        } else {
            this.subscribers[type] = [callBack];
        }
    }
}
