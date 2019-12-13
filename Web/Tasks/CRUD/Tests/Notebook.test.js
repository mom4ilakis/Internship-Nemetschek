const Note = require('../note');

const Notebook = require('../notebook');

jest.mock('../note');

describe('Notebook testing', () => {
    test('Notebook creation', () => {
        const notebook = new Notebook();
        expect(notebook.notes).toEqual({});
    });

    test('Notebokk addNote', () => {
        const notebook = new Notebook();
        const note = new Note();
        notebook.addNote(note);
        expect(notebook.notes[note.ID]).toEqual(note);
    });

    describe('Notebook add/del tests', () => {
        test('addNote', () => {
            const note = new Note();
            const notebook = new Notebook();
            notebook.addNote(note);
            expect(notebook.notes[note.ID]).toEqual(note);
            expect(note.save).toHaveBeenCalled();
        });
        test('deleteNote', () => {
            const note = new Note();
            const notebook = new Notebook();
            notebook.addNote(note);
            notebook.deleteNote(note.ID);
            expect(note.delete).toHaveBeenCalled();
        });
        test('deletAll', () => {
            const notes = [new Note(), new Note(), new Note(), new Note()];
            const notebook = new Notebook();
            notes.forEach(note => {
                notebook.addNote(note);
            });
            expect(notebook.deleteNote).toHaveBeenCalledTimes(4);
        });
    });
});
