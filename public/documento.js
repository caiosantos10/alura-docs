const socket = io();

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');

const input = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');
const deleteButton = document.getElementById('excluir-documento');

documentTitle.textContent = documentName || 'Documento sem título';

// DOM handle methods
function selectDocument(name) {
    socket.emit('select-document', name);
}
selectDocument(documentName);

input.addEventListener('keyup', () => {
    socket.emit('input-text', input.value, documentName);
});

window.onunload = () => {
    socket.emit('update-document', input.value, documentName);
}

// websocket events
socket.on('document-text', (text) => {
    input.value = text;
});

socket.on('input-text', (text) => {
    input.value = text;
});

deleteButton.addEventListener('click', () => {
    socket.emit('delete-document', documentName, () => {
        window.location = 'index.html';
    });
});