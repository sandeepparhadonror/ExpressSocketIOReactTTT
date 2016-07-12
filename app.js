'use strict';

 var path = require('path');
 var express = require('express');
 var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// Game variable

var players = [];

app.use('/', express.static(path.join(__dirname, 'public')));

 io.on('connection', function(socket){

   var game = {};

   socket.on('add player', function(playerName){
     console.log(playerName);
     console.log(players.length);

     socket.playerName = playerName;
     players.push({
       playerName : playerName,
       socketID : socket.id
     })

     if (players.length === 2 ){
         io.emit('joined game', game);
     }
     else if (players.length > 2 ) {
      // socket.emit('joined game', game);
      console.log("game book");
      socket.emit('gameFull', playerName);
     }
     else {
      console.log('Some Thing went wrong');
    }



    //  io.emit('add player', playerName);
   });

 });

server.listen(4000);
console.log("server is running on http://localhost:4000");
