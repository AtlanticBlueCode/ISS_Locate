

const express = require('express');
const app = express();

//const server = app.listen(3000);
  const server = app.listen(80);
  
app.use(express.static('public'));

console.log("My Socket Server Is Running");

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection (socket){
    console.log("New Connection: " + socket.id );

    socket.on("mouse",mouseMsg);

    function mouseMsg(data){
        console.log("Data from Connection: "+ socket.id +" => " + "X = "+data.x + " | Y = "+data.y);
        
        // enviar do socket emissor para todos os outros
        socket.broadcast.emit("mouseBroadcast",data);


        // enviar do socket emissor para todos os sockets (incluindo o próprio)
        // io.sockets.emit("mouse",data);
    }
};


