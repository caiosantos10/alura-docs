const socket = io();

const menu = document.getElementById('lista-documentos');

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
