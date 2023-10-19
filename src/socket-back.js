import io from './server.js';
import client from '../mongodb.connect.js'

const db = client.db('my-skills');
const docs = db.collection('my-skills');

io.on('connection', (socket) => {
    console.log('Um clinte se conectou, ID: ', socket.id);

    socket.on('select-document', async (documentName) => {
        socket.join(documentName);
        const document = await findDocument(documentName);

        if (document) {
            console.log(document)
            socket.emit('document-text', document.text);
        }
    });

    socket.on('input-text', (value, documentName) => {
        socket.to(documentName).emit('input-text', value);
    });
});

async function findDocument(name) {
    const document =  await docs.findOne({ name });
    return document;
}