import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import '../mongodb.connect.js';

const port = process.env.port || 3000;

const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, '../..', 'public');
app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`Servidor está escutando na porta ${port}`);
});

const io = new Server(httpServer);

export default io;