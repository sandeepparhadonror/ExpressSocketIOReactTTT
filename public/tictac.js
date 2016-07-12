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
        <table>
            <tbody>
              {rows}
            </tbody>
        </table>
      </div>
    );
  }
});

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

ReactDOM.render(
  <TicTacTable size={SIZE} data={data}/>,
  document.getElementById('tic-toy-game-page')
);
