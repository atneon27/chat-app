import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server)

app.get('/', (req, res) => {
    res.json({
        msg: "Fired up a new user!"
    })
})

io.on('connection', (socket) => {
    console.log('a user connected');
})

server.listen(3000, () => {
    console.log("Server is Listening on port 3000")
})