import io from './server.js';
import client from '../mongodb.connect.js'

const db = client.db('my-skills');
const docs = db.collection('my-skills');

io.on('connection', (socket) => {
    console.log('Um clinte se conectou, ID: ', socket.id);

    // listening get all documents
    socket.on('get-documents', async (callback) => {
        const docs = await findAllDocuments();
        callback(docs);
    });

    // listening get one document
    socket.on('select-document', async (documentName) => {
        socket.join(documentName);
        const document = await findDocument(documentName);

        if (document) {
            socket.emit('document-text', document.text);
        }
    });

    // listening create one document
    socket.on('create-document', async (document, callback) => {
        await createDocument({ name: document });
        const docs = await findAllDocuments();
        callback(docs);
    });

    // listening update one document
    socket.on('update-document', async (id, newDocument, callback) => {
        await updateDocument(id, newDocument );
        callback();
    });

    // listening delete one document
    socket.on('delete-document', async (documentName, callback) => {
        await deleteDocument(documentName);
        callback();
    });

    // listening keyup event on document.html
    socket.on('input-text', (value, documentName) => {
        socket.to(documentName).emit('input-text', value);
    });
});

// DB resources
async function findDocument(name) {
    try {
        const document = await docs.findOne({ name });
        return document;
    } catch (error) {
        console.error(error.message);
    }
}
async function findAllDocuments() {
    try {
        return await docs.find().toArray();
    } catch (error) {
        console.error(error.message)
    };
}
async function createDocument(document) {
    try {
        const doc = await docs.insertOne(document);
        console.log(doc);
    } catch (error) {
        console.error(error.message);
    }
}
async function deleteDocument(name) {
    try {
        await docs.deleteOne({ name });
    } catch (error) {
        console.error(error.message);
    }
}
async function updateDocument(id, newDocument) {
    try {
        await docs.updateOne({ id }, { ...newDocument });
    } catch (error) {
        console.error(error.message);
    }
}