var express = require('express');
var app = express();
var serv = require('http').Server(app);

 app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client');
});
// app.use('/client',express.static(__dirname + '/client'));

app.use(express.static('client'));

serv.listen(8081);
console.log('Server started');

var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket){
    console.log(`New connection ${socket.id}`);

    socket.on('PositionEvent', function(data){
        console.log('Position: ' + 'x: ' + data.x, 'y: ' + data.y);
        socket.broadcast.emit('NewPositionEvent',data);
    });

    // socket.emit('NewPositionEvent',{
    //     data.x
    // });
});

// // function newConnection(socket){
// //     socket.on('positionEvent', (data) => {
// //         // console.log(data);
// //         socket.broadcast.emit('positionEvent',data);
    
// //         const pack = {
// //           x: data.x,
// //           y: data.y,
// //         };

// //         console.log(data);
// //         socket.emit('positionEvent', pack);
// //     });

//       // function mouseMsg(data){
//   //   socket.broadcast.emit('positionEvent',data);
//   //   console.log(data),
