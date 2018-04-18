import React, { Component } from 'react'; 
import { FlatList } from './Utils';
import mario_crop from '../files/mario-crop.jpg';
import mario_win from '../files/mario-win.jpg';
import toad from '../files/toad-blue.jpg';

/**
 * @class Box
 * @extends ReactComponent
 * @description Renders boxes on the game board.
 */
export default class Box extends Component {
  constructor(props) {
    super(props)
    this.BoxView = this.BoxView.bind(this);
    this.RenderIfGameIsWon = this.RenderIfGameIsWon.bind(this);
  }

  /**
   * @method BoxView
   * @param {React.Props} boxProps 
   * @description Renders a Mario image or blank space as view on a Box component.
   * @return {HTMLElement|null} Image or null.
   */
  BoxView(boxProps){
    const { toadBoxIndex, thisIsLastIndex } = boxProps;
    const { boardIndex, data } = this.props;
    const { marioBox } = data;
    const thisIsMarioBox =  boardIndex === marioBox;
    if(toadBoxIndex === boardIndex){
      return (
        <img src={toad} alt="toads on the game board"/>
      )
    }
    else if(thisIsLastIndex && thisIsMarioBox){
      return (
        <img src={mario_crop} alt="mario catching toads on the game board" />
      )
    }
    else return null;      
  }
  
  /**
   * @method RenderIfGameIsWon
   * @param {React.Props} 
   * @description Renders a Mario image when the game is won.
   * @return {HTMLElement|null} Image or null.
   */
  RenderIfGameIsWon({ check }){
    const { boardIndex, data } = this.props;
    const { marioBox } = data;
    check = check && boardIndex === marioBox;
    return check ? (
      <img src={mario_win} alt="mario has won" />
    ) : null;
  }

  render() {
    const { BoxView, RenderIfGameIsWon } = this;
    const { toadBoxes, gameIsWon } = this.props.data;
    return (
      <div className="box">
        <FlatList
          list={toadBoxes}
          listView={(i, o, u) => (
            <BoxView 
              key={`toad ${i}`}
              toadBoxIndex={i}
              thisIsLastIndex={o === u.length - 1}
            />
          )}
        />
        <RenderIfGameIsWon check={gameIsWon} />  
      </div>
    )
  }
}
