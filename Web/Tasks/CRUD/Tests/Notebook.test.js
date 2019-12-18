const Note = require('../note');

const uuid = require('../utils');
const Notebook = require('../notebook');

jest.mock('../note');

describe('Notebook testing', () => {
    test('Notebook creation', () => {
        const notebook = new Notebook();
        expect(notebook.notes).toEqual({});
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
        test('deleteAll on empty notebook', () => {
            const notebook = new Notebook();
            notebook.deleteNote = jest.fn();
            notebook.deleteAll();
            expect(notebook.deleteNote).toBeCalledTimes(0);
        });
        test('deleteAll', () => {
            const notes = [new Note('t', 'b', '1'), new Note('t', 'b',  '2'), new Note('t', 'b', '3'), new Note('t', 'b', '4')];
            const notebook = new Notebook();
            notes.forEach(note => {
                note.ID = uuid();
                notebook.addNote(note);
            });
            notebook.deleteNote = jest.fn();
            notebook.deleteAll();
            expect(notebook.deleteNote).toHaveBeenCalledTimes(4);
        });
        test('updateNote on empty notebook', () => {
            const note = new Note();
            const notebook = new Notebook();
            note.ID = uuid();
            notebook.updateNote(note);
            expect(notebook.notes[note.ID]).toEqual(note);
        });
        test('updateNote', () => {
            const note = new Note();
            note.ID = uuid();
            note.title = 'title';
            note.body = 'body';
            const notebook = new Notebook();

            notebook.addNote(note);

            note.title = 'title1';
            note.body = 'body1';

            notebook.updateNote(note);

            expect(notebook.notes[note.ID].title).toEqual(note.title);
            expect(notebook.notes[note.ID].body).toEqual(note.body);
        });
        test('load on empty notebook', () => {
            global.notesAPI = {
                getNotes: jest.fn()
                    .mockResolvedValue([new Note(), new Note(), new Note(), new Note()]),
            };
            const notebook = new Notebook();
            notebook.load();
            expect(global.notesAPI.getNotes).toHaveBeenCalled();
        });
    });
});
