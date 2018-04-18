import React, { Component } from 'react';
import { ForLoop } from './Utils';
import Box from './Box';

/**
 * @class Row
 * @extends ReactComponent
 * @description Row component where boxes are rendered in columns. Each box in a row has a rowIndex. The rowIndex is unique to every Row class instance.
 */
export default class Row extends Component {
  constructor(props) {
    super(props)
    this.createBox = this.createBox.bind(this);
  }
  
  /**
   * @method createBox
   * @param {number} i Unique index for a box.
   * @description Renders a Box component and issues a unique boardIndex number.
   * @return {ReactComponent} Box component
   */
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
