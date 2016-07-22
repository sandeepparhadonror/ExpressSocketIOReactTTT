var Cells = React.createClass({
  render: function() {
    return (
          <td>{this.props.data}</td>
    );
  }
});

var Rows = React.createClass({
  render: function() {
    var i, cols = [];
    for (i = 0; i < this.props.size; i++){
      cols.push(<Cells {...this.props} key={i} data={this.props.data[i]} />);
    }

    return (
        <tr>
          {cols}
        </tr>
    );
  }
});

var TicTacTable = React.createClass({
  render: function(){
    var i, rows = [];
    for (i = 0; i < this.props.size; i++){
      rows.push(<Rows {...this.props} key={i} data={this.props.data[i]}/>);
    }
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

    },

    render: function () {
        return (

            <div className="ticTacToeBoard">

                <h2> Tic Tac Toe </h2>

                <TicTacTable size={SIZE} data={data}/>

                <div id="enter-page" className="row page">
                  <div className="col-md-12">
                    <hr></hr>
                    <div className="form-group">
                      <input id="playerNameInput" type="text" className="form-control" placeholder="Enter player name"/>
                    </div>
                    <div className="control-group">
                      <div className="controls">
                        <button id="playBtn" className="btn btn-success" onClick={this._onclick}>Play</button>
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

            </div>
        );
    },


    _onclick: function() {
      console.log("we have send player name start game")
      var playerName = setPlayerName();

    },

    setPlayerName: function() {
      var playerName = document.getElementById('playerNameInput').value.trim();
      if (playerName){
         return playerName;
      }else {
        return "defualtPlayerName";
      }
    },


    _hideOtherComponet: function() {
        document.getElementById('waiting-page').style.display = "none";
        document.getElementById('result-page').style.display = "none";
        document.getElementById('room-size-full').style.display = "none";
        document.getElementById('tic-toy-game-page').style.display = "none";
    },

    _bindEvents: function(){


    }

});

// Dynamic table creation
var SIZE = 4;

function getDataArray(size) {
    var i, j, rowArr = [], colArr = [];
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            colArr[j] = 0;
        }
        rowArr[i] = colArr;
    }
    return rowArr;
};

var data = getDataArray(SIZE);

// React main componet calling

ReactDOM.render(
  <MainApp />,
  document.getElementById('tic-toe-game-board')
);
