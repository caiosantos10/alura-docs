const socket = io();

const input = document.getElementById('editor-texto');

input.addEventListener('keyup', () => {
    socket.emit('input-text', input.value);
});

socket.on('input-text', (text) => {
    input.value = text;
});