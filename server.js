const express = require("express");
const http = require("http");


const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = require("socket.io")(server);

const PORT = 9999;

const rooms = new Map();

app.get('/rooms', (req, res)=> {
  res.json(rooms);
});

app.post('/rooms', (req, res)=>{
  const {roomId, username} = req.body;

  if(!rooms.has(roomId)){
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []]
    ]));
    
  }
  
  res.json({
    status: 'success',
    data: [...rooms.keys()]
  }); 
  
  
});

io.on('connection', (socket)=>{
  socket.on('ROOM:JOIN', (data) => {
    socket.join(data.roomId);
    const user = rooms.get(data.roomId).get('users').set(socket.id, data.username);
    const users = rooms.get(data.roomId).get('users').values();
    socket.to(data.roomId).broadcast.emit('ROOM:JOINED', users);
    
  });
  
})

server.listen(PORT, (err)=>{
  if(err){
    throw Error(err)
  }
  console.log('SERVER RUNNING')
});
