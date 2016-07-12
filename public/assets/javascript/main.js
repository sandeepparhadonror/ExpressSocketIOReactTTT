$(document).ready(function(){
   var socket = io();

    //pages
    var $enter = $("#enter-page"),
        $waiting = $("#waiting-page"),
        $game = $("#tic-toy-game-page"),
        $result = $("#result-page"),
        $gameFull = $('#room-size-full');

    $('#playBtn').click(function(e){
        setPlayerName();
        socket.emit('buttonClick', 'sandeep');
    });

    function switchPage(page) {
      $('.page').css({
        'display': 'none'
      });
      page.css({
        'display': 'block'
      });
    }

    function setPlayerName(){
      playerName = $('#playerNameInput').val().trim();

      if (playerName){
        socket.emit('add player', playerName);
        switchPage($waiting);
      }
    };

    socket.on('joined game', function(game){
      switchPage($game);
    });

    socket.on('gameFull', function(playerName){
      switchPage($gameFull);
    });


    // Init app
    switchPage($enter);

});
