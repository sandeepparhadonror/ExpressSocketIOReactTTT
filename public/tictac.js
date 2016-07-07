


var

var TicTacTable = React.createClass({
  render: function(){
    return (  
      <div>

      for(var i =0; i < data ; i++ ) {
        <table>
          <tbody>
            <tr>
              <td>0</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>0</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>0</td>
              <td>1</td>
              <td>2</td>
            </tr>
        </tbody>
      </table>
      }

      </div>
    );
  }
});

//data = [ 0,1,0,1,0,2,0,1,2]

  ReactDOM.render(
    <TicTacTable />,
    document.getElementById('tic_toy_grid')
  );
