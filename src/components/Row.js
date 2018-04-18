import React, { Component } from 'react';
import { ForLoop } from './Utils';
import Box from './Box';

export default class Row extends Component {
  constructor(props) {
    super(props)
    this.createBox = this.createBox.bind(this);
    this.state = {
       
    }
  }
  
  createBox(i){
    const { rowIndex, data: {columns} } = this.props;
    const boardIndex = rowIndex * columns + i;
    return (
      <Box
        key={`box ${i}`}
        boardIndex={boardIndex}
        data={this.props.data}
      />
    )
  }

  render() {
    const { columns } = this.props.data;
    return (
      <div className="rows">
        <ForLoop
          times={columns}
          loopView={this.createBox}
        />
      </div>
    )
  }
}
