import io from './server.js';

const docs = [
    {
        name: 'JavaScript',
        text: 'texto de javascript'
    },
    {
        name: 'Node',
        text: 'texto de nodejs'
    },
    {
        name: 'Socket.io',
        text: 'texto de socket'
    }
]

io.on('connection', (socket) => {
    console.log('Um clinte se conectou, ID: ', socket.id);

    socket.on('select-document', (documentName) => {
        socket.join(documentName);
        const document = findDocument(documentName);

        if (document) {
            socket.emit('document-text', document.text);
        }
    });
    socket.on('input-text', (value, documentName) => {
        socket.to(documentName).emit('input-text', value);
    });
});

function findDocument(name) {
    return docs.find(document => document.name === name);
}