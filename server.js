
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


/* Game variable configs */
var SIZE = 5,
    MARKERS = ['X', 'O'],
    current_player_connection = 0,
    players = [],
    initialGameState, activeMarker;

function _init() {
    initialGameState = getInitialState(SIZE);
    activeMarker = MARKERS[0];
    activePlayerMarkerName = players[0];
}

function getInitialState(size) {
    var i, j, result = [], row;
    for (i = 0; i < size; i++) {
        row = [];
        for (j = 0; j < size; j++) {
            row.push(0);
        }
        result.push(row);
    }
    return result;
};

/*  Kick off app state */

_init();

io.on('connection', function(socket){
    ++current_player_connection;

    socket.on('game:start', function(playerName){

        socket.playerName = playerName;
        players.push( playerName );


        socket.marker = MARKERS[current_player_connection - 1];
        socket.player_name = players[current_player_connection - 1]


        if (current_player_connection > 2) {
          console.log("3rd player connecting");
          if (players.length > 2){
            players.pop();
          }
          socket.emit('game:start:limit:exceeded');
          return;
        }

        socket.emit('game:started', {
          size: SIZE,
          data: initialGameState,
          marker: MARKERS[current_player_connection - 1],
          player_marker_name: players[current_player_connection - 1],
          activeMarker: activeMarker,
          activePlayerMarkerName: activePlayerMarkerName
        });

        if (current_player_connection < 2) {
          console.log("first player is join"+ players[0]);
          socket.emit('game:started:other:layer:onhold');
        }else {
          io.emit('game:start:ready:to:play',{});
        }

        console.log("The number of player is " + players + "in Game" );
        console.log("The " + current_player_connection + " st player joined the ganme");
    //  io.emit('add player', playerName);
   });

   socket.on('game:restart', function(){
      io.emit('game:result:done', {});
   });

   socket.on('disconnect', function(){
     console.log(--current_player_connection);
     if (current_player_connection === 0){
       console.log("All player left the Game");
       _init();
     } else if (current_player_connection < 2) {

       var looser = socket.marker;
       var looser_playerName = socket.playerName
       var winner_playerName = getWinnerPlayerName(socket.playerName);
       var winner = getOpponentMarker(socket.marker);
       console.log("Player " + looser + " and name is" + looser_playerName + " left the game");
       console.log("Player " + winner + "and winner anem is" + winner_playerName +" the game");
       io.emit('game:result', looser, winner ,looser_playerName, winner_playerName );
     }
   });

   function getWinnerPlayerName(winner_player_name) {
     return winner_player_name ===  players[0] ? players[1] : players[0];
   }

   function getOpponentMarker(marker) {
       return marker === MARKERS[0] ? MARKERS[1] : MARKERS[0];
   }


 });
