
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

var io = require('socket.io')(server);

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
// Set permissive CORS header - this allows this server to be used only as
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


/* Game configs */

var current_player_connection = 0;


io.on('connection', function(socket){

    var players

    socket.on('game:start', function(playerName){
        ++current_player_connection;

        console.log(playerName);
        console.log(++current_player_connection);


        if (current_player_connection > 2) {

        }

        if (current_player_connection < 2) {
          socket.playerName = playerName
          players.push({
            playerName : playerName
          })

        }




     socket.playerName = playerName;
     players.push({
       playerName : playerName,
       socketID : socket.id
     })

     console.log(players.length);

     if (players.length === 2 ){
         socket.emit('joined game', game);
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
