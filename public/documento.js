const socket = io();

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');

const input = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');

documentTitle.textContent = documentName || 'Documento sem título';

function selectDocument(name) {
    socket.emit('select-document', name);
}
selectDocument(documentName);

input.addEventListener('keyup', () => {
    socket.emit('input-text', input.value, documentName);
});

socket.on('document-text', (text) => {
    input.value = text;
});

socket.on('input-text', (text) => {
    input.value = text;
});