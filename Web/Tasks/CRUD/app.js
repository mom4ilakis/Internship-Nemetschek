const buttons = {
    save: document.getElementById('saveBtn'),
    new: document.getElementById('newBtn'),
    delete: document.getElementById('deleteBtn'),
    deleteAll: document.getElementById('deleteAllBtn')
};

const notebook = new Notebook();

notebook.loadNotes();

buttons.new.addEventListener('click', notebook.createNewNote);

//buttons.save.addEventListener('click', notebook.note.notify);

buttons.delete.addEventListener('click', notebook.deleteLoadedNote);

buttons.delete.addEventListener('click', notebook.delete);
