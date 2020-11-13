var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv,{});
var PORT = process.env.PORT || 8081

app.use(express.static(__dirname + '/client'));

serv.listen(PORT, ()=>{
    console.log('Server started: '+PORT);
});

io.sockets.on('connection',function(socket){
    console.log(`New connection ${socket.id}`);

    socket.on('PositionEvent', function(data){
        socket.broadcast.emit('NewPositionEvent',data);
    });

    socket.on('ResetBackground', function(){
        socket.broadcast.emit('NewResetBackground');
    });
});
