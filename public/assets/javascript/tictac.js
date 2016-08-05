var Cells = React.createClass({
  render: function() {
    var myFontSize = parseInt((10 / this.props.size)*2, 10) + 'em';
    var myStyle = {
        'fontSize': myFontSize
    };

    return (
      <td onClick={this._onClick} style={myStyle} width={100 / this.props.size + '%'} height={100 / this.props.size + '%'}>
          {this.props.data}
      </td>
    );
  },

  _onClick: function () {
      if (typeof this.props.onTurnPlayed === 'function') {
          this.props.onTurnPlayed(this.props.turn, this.props.rowNum, this.props.colNum);
      }
  }

});

var Rows = React.createClass({
  render: function() {
    var i, cells = [];
    for (i = 0; i < this.props.size; i++){
      cells.push(<Cells {...this.props} key={i} colNum={i} data={this.props.data[i]} />);
    }

    return (
        <tr>
          {cells}
        </tr>
    );
  }
});

var TicTacTable = React.createClass({

  propTypes: {
      size: React.PropTypes.number.isRequired,
      data: React.PropTypes.array.isRequired,
      onTurnPlayed: React.PropTypes.func,
      onRestart: React.PropTypes.func
  },


  getDefaultProps: function () {
      return {
          markerOne: 'X',
          markerTwo: 'O'
      };
  },

  render: function(){
    var i, rows = [];
    for (i = 0; i < this.props.size; i++){
      rows.push(<Rows {...this.props}  data={this.getMappedData(this.props.data[i])} key={i} rowNum={i}/>);
    }
  //  var winner = this.props.winnerData.winner;
    return (
      <div>
        <div id="tic-toy-game-page" className="row page">
          <table>
              <tbody>
                {rows}
              </tbody>
          </table>
        </div>
      </div>
    );
  },

  _restartGame: function () {
      if (typeof this.props.onRestart === 'function') {
          this.props.onRestart();
      }
  },

  getMappedData: function (data) {
      var hash = {
          0: null,
          1: this.props.markerOne,
          2: this.props.markerTwo
      };

      return data.map(function (data) {
          return hash[data];
      });
  }

});

var MainApp = React.createClass({
    getInitialState: function()  {
        return{};
    },

    componentDidMount: function() {
        this.socket = io();
        this._hideOtherComponet();
        this._bindEvents();

    },

    componentWillUnmount: function() {
        this.socket.disconnect();
    },

    render: function () {
        return (
          /*  <div className="ticTacToeBoard">
               <h2> Tic Tac Toe </h2> */

               <TicTacTable   size={this.state.size}
                              winnerData={this.state.winnerData}
                              turn={2}
                              data={this.state.date}
                              onTurnPlayed={this.state._onTurnPlayed}
                              onRestart={this.state._onRestartGame}/>


/*                <div id="enter-page" className="row page">
                  <div className="col-md-12">
                    <hr></hr>
                    <div className="form-group">
                      <input id="playerNameInput" type="text" className="form-control" placeholder="Enter player name"/>
                    </div>
                    <div className="control-group">
                      <div className="controls">
                        <button id="playBtn" className="btn btn-success" onClick={this._getPlayerName}>Play</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="waiting-page" className="row page">
                  <div className="col-md-12">
                    <h2>Waiting for opponent</h2>
                    <hr></hr>
                    <i className="fa fa-refresh fa-spin fa-5x"></i>
                  </div>
                </div>

                <div id="result-page" className="row page">
                  <div className="col-md-12">
                    <div className="well">
                      <h3 id="resultText"></h3>
                      <button id="playAgainBtn" className="btn btn-success">Play again!</button>
                    </div>
                  </div>
                </div>

                <div id="room-size-full" className="row page">
                  <div className="col-md-12">
                    <div className="well">
                      <h2> There are allready 2 player plaing the game , please join after some time</h2>
                    </div>
                  </div>
                </div>

                <div id="restart-game">
                  <div id="popupMessage">You win Gane</div>
                  <button id="restartGame" className="restartGame" onClick={this._restartGame}>Restart Game</button>
                </div> */


          /*  </div> */
        );
    },


    _getPlayerName: function() {
      console.log("we have send player name start game")
      var playerName = this.setPlayerName();
      this.socket.emit('game:start', playerName);

    },

    _onTurnPlayed: function (turn, rowNum, colNum) {
        this.socket.emit('game:play:turn', this.state.marker, rowNum, colNum);
    },

    _onRestartGame: function(){
        this.socket.emit('game:restart');
    },

    setPlayerName: function() {
      var playerName = document.getElementById('playerNameInput').value.trim();
      if (playerName){
         return playerName;
      }else {
        return "defualtPlayerName";
      }
    },



    _looserDetail: function(looser, looser_playerName) {
        'looser_playerName is lost the Game'
    },

    _winnerDetail: function(winner, winner_playerName) {
     'winner_playerName is win the Game'
    },


    _hideOtherComponet: function() {
        document.getElementById('waiting-page').style.display = "none";
        document.getElementById('result-page').style.display = "none";
        document.getElementById('room-size-full').style.display = "none";
        document.getElementById('tic-toy-game-page').style.display = "none";
        document.getElementById('restart-game').style.display = 'none';
    },

    _bindEvents: function(){
      var self = this;
      var playerMarker;
      var playerMarker_name;

        this.socket.on('game:started', function(options){

          self.setState({
            data: options.data,
            size: options.size || self.state.size,
            marker: options.marker || self.state.marker,
            player_marker_name: options.player_marker_name || self.state.player_marker_name
          });


        });

        this.socket.on('game:start:ready:to:play', function(){
            console.log("game:start:ready:to:play");
            document.getElementById('enter-page').style.display = "none";
            document.getElementById('waiting-page').style.display = "none";
            document.getElementById('tic-toy-game-page').style.display = "block";
        });

        this.socket.on('game:started:other:layer:onhold', function(){
            console.log("game:started:other:layer:onhold");
            document.getElementById('waiting-page').style.display = "block";
            document.getElementById('enter-page').style.display = "none";
            document.getElementById('tic-toy-game-page').style.display = "block";
        });

        this.socket.on('game:start:limit:exceeded', function(){
            document.getElementById('enter-page').style.display = "none";
            document.getElementById('room-size-full').style.display = "block";
            document.getElementById('waiting-page').style.display = "none";
            document.getElementById('result-page').style.display = "none";
            document.getElementById('tic-toy-game-page').style.display = "none";
            document.getElementById('enter-page').style.display = "none";
        });



        this.socket.on('game:result', function(looser, winner ,looser_playerName, winner_playerName){
            console.log("game result called");
            var gameResult = playerMarker === looser ? 'You lost the Game' : 'You won the Game';

            document.getElementById('restart-game').style.display = 'block';
            document.getElementById('popupMessage').innerHTML = gameResult;
            document.getElementById('enter-page').style.display = "none";
        });

        this.socket.on('game:result:done', function(){
              console.log("Restart the new Game");
              window.location.reload();
        });


    }

});

// Dynamic table creation
// var SIZE = 4;
//
// function getDataArray(size) {
//     var i, j, rowArr = [], colArr = [];
//     for(i = 0; i < size; i++) {
//         for(j = 0; j < size; j++) {
//             colArr[j] = 0;
//         }
//         rowArr[i] = colArr;
//     }
//     return rowArr;
// };
//
// var data = getDataArray(SIZE);
//
// React main componet calling

ReactDOM.render(
  <MainApp />,
  document.getElementById('tic-toe-game-board')
);
