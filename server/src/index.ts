import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';
import { UserDetails, UserMessage } from './types';

const app = express();
const server = createServer(app);

// socket cors setup
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// in memory user list
let userCnt = 0;
const connectedUsers: UserDetails[] = [];

io.on('connection', (socket) => {
    // on connection keep track of the user
    const user: UserDetails = {
        name: `User ${++userCnt}`,
        connId: socket.id,
        connnectedOn: new Date(),
    }
    connectedUsers.push(user);

    console.log(`User with id:${socket.id} connected`);

    // socket connection
    socket.on('chat-message', (data) => {
        console.log(`Incoming Message from user with id:${socket.id}`);

        const broadcastMessage: UserMessage = {
            id: data.id,
            name: connectedUsers.find((user) => user.connId == data.id)?.name,
            text: data.text,
            time: data.time,
        }
        
        // broadcast the message to all connected users
        socket.broadcast.emit('chat-message', broadcastMessage);

        // removing disconnected user from the list
        socket.on('disconnect', () => {
            console.log(`User with id:${socket.id} disconnected`);
            connectedUsers.forEach((user, index) => {
                if (user.connId == socket.id) {
                    connectedUsers.splice(index, 1);
                }
            })
        })
    })
})

// get all connected users
app.get('/users', (req, res) => {
    res.json({
        msg: connectedUsers
    })
})

server.listen(3000, () => {
    console.log("Server is Listening on port 3000")
})