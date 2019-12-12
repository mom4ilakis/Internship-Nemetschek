const Note = require('../note');

test('create note with no params', () => {
    const note = new Note();
    expect(note.title).toBeFalsy();
    expect(note.body).toBeFalsy();
})

test('create note with title and no body', () => {
    const note = new Note('To do');
    expect(note.title).toEqual('To do');
    expect(note.body).toBeFalsy();
})

test('create note with title and body', ()=> {
    const note = new Note('To do', 'Debug');
    expect(note.title).toEqual('To do');
    expect(note.body).toEqual('Debug');
})

test('call updateBody on empty note', ()=> {
    const note = new Note();
    note.updateBody('stuff');
    expect(note.body).toEqual('stuff')
})

test('call updateBody', () => {
    const note = new Note('Title1', 'body1');
    note.updateBody('updatedBody');
    expect(note.body).toEqual('updatedBody');
})

test('call updateTitle on empty note', () => {
    const note = new Note();
    note.updateTitle('New title');
    expect(note.title).toEqual('New title');
})

test('call updateTitle', () => {
    const note = new Note('Title', 'body');
    note.updateTitle('Other title');
    expect(note.title).toEqual('Other title');
})

// test('call delete note on empty note',() => {
//     const notesAPI = {
//         deleteNote = mock
//     }
// })
