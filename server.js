const express = require("express");
const http = require("http");


const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

const PORT = 9999;

app.get('/rooms', (req, res)=> {
  res.send('Hello')
});

io.on('connection', (socket)=>{
  console.log('user connsected', socket.id)
})

server.listen(PORT, (err)=>{
  if(err){
    throw Error(err)
  }
  console.log('SERVER RUNNING')
});
