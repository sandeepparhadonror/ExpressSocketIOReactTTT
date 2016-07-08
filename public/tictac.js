var Cells = React.createClass({
  render: function() {
    console.log(data);
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

var data = [
  [1,1,2,2,2],
  [0,1,2,0,2],
  [0,1,1,0,2],
  [0,2,2,1,2],
  [0,2,2,0,1]
];

var SIZE = 5;

ReactDOM.render(
  <TicTacTable size={SIZE} data={data}/>,
  document.getElementById('tic_toy_grid')
);
