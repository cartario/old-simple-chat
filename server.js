const express = require("express");
const http = require("http");

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = require("socket.io")(server);

const PORT = 9999;

const rooms = new Map();

app.get('/rooms/:id', (req, res)=> {
  const roomId = req.params.id;
  
  const obj = rooms.has(roomId) ? {
    users: [...rooms.get(roomId).get('users').values()],
    messages: [...rooms.get(roomId).get('messages').values()]
  } : {users: [], messages: []};
  
  res.json(obj);
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
    const users = [...rooms.get(data.roomId).get('users').values()] ;
    socket.to(data.roomId).broadcast.emit('ROOM:SET_USERS',  users);      
  });

  socket.on('ROOM:NEW_MESSAGE', (data) => {
    const {roomId, text, userName} = data;
    const obj =  {
      roomId, text, userName
    };

    rooms.get(roomId).get('messages').push(obj);  
    socket.to(roomId).emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId)=>{
      if(value.get('users').delete(socket.id)){
        const users = [...value.get('users').values()];
        console.log(users)
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS',  users);   
      }
    })
  });
});

server.listen(PORT, (err)=>{
  if(err){
    throw Error(err)
  }
  console.log('SERVER RUNNING')
});
