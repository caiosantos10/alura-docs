import io from './server.js';

io.on('connection', (socket) => {
    console.log('Um clinte se conectou, ID: ', socket.id)
    socket.on('input-text', (value) => {
        socket.broadcast.emit('input-text', value);
    });
});