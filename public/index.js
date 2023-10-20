const socket = io();

const menu = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const input = document.getElementById('input-documento');

socket.emit('get-documents', (docs) => {
    buildMenu(docs);
});

function buildMenu(items) {
    for (let item of items) {
        menu.innerHTML += `
        <a href="documento.html?nome=${item.name}" class="list-group-item list-group-item-action">
            ${item.name}
        </a>
    `
    }
}

form.addEventListener('submit', () => {
    socket.emit('create-document', input.value, (docs) => { 
        alert(` Documento ${input.value} criado com sucesso!`);
        buildMenu(docs);
    });
});
