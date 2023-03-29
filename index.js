const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.port || 3000;

app.get('/',(req,res)=>{
    res.write(`<h1>port = ${port}</h1>`)
});
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    // socket.broadcast.to('ID').emit( 'send msg', {somedata : somedata_server} );
    io.emit('message', `${socket.id}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));