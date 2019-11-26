function uuid4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

class Note {
    constructor(srcTitle, content, id = uuid4()) {
        this.title = srcTitle;
        this.ID = id;
        this.content = content;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    updateContent(newContent) {
        this.content = newContent;
    }

    createDomElement() {
        const element = document.createElement('div');
        element.setAttribute('id', this.ID);
        element.innerHTML = this.title;
        element.addEventListener('click', () => { page.loadNote(this); });

        return element;
    }

    render(target) {
        target.appendChild(this.createDomElement());
    }
}
