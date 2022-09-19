const port = process.env.PORT || 3000;

const io = require('socket.io')(port, {
  cors: {
    origin: ['http://localhost:5173']
  }
});

io.on('connection', socket => {
  console.log(socket.id);
  socket.on('send-message', (message, room) => {
    if (room === "") socket.broadcast.emit('receive-message', message);
    else socket.to(room).emit('receive-message', message);
  })

  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb();
  })
})