const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('join', (name) => {
    users.push({ id: socket.id, name });
    io.emit('users', users.map((user) => user.name));
  });

  socket.on('send-message', ({ message, to }) => {
    const recipient = users.find((user) => user.name === to);
    if (recipient) {
      io.to(recipient.id).emit('new-message', message);
    }
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit('users', users.map((user) => user.name));
    console.log('user disconnected', socket.id);
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
