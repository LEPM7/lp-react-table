import React, { Component } from 'react';

class TableRow extends Component {

  createCells(obj){
    return Object.keys(obj).map((key) => <td>{obj[key]}</td>);
  }

  render() {
    return (
      <tr>
        {this.createCells(this.props.obj)}
      </tr>
    );
  }
}

export default TableRow;