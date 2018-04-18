import React, { Component, Fragment } from 'react';
import GameTab from './components/GameTab';
import Board from './components/Board';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateGameBoard = this.updateGameBoard.bind(this);
    this.evaluateMarioPosition = this.evaluateMarioPosition.bind(this);

    this.actions = {
      setAppState: this.letChildrenSetState.bind(this)
    }

    this.state = {
      time: 0,
      rows: 10, 
      columns: 10, 
      isGameStarted: false,
      hitList: [],
      toadBoxes: [],
      movesList: [],
      gameIsWon: false,
      numberOfToads: 0
    }
  }
  
  componentDidCatch(error, info){
    console.log(error, info)
  }

  componentDidUpdate() {
    this.state.isGameStarted && window.addEventListener('keyup', this.handleKeyPress);
    !this.state.isGameStarted && window.removeEventListener('keyup', this.handleKeyPress);
  }

  evaluateMarioPosition(){
    const { marioBox, columns, rows } = this.state;;
    const quotient = marioBox / columns;
    const modulus = marioBox % columns;

    return {
      MarioMoveUp: Math.floor(quotient) > 0,
      MarioMoveDown: Math.ceil(quotient) < rows && (rows - quotient > 1),
      MarioMoveLeft: (modulus) > 0,
      MarioMoveRight: (modulus) < (columns - 1)
    }
  }

  handleKeyPress(e){
    const keyIsNotValid = [27,37,38,39,40].indexOf(e.which) < 0;
    if(keyIsNotValid) return;

    let { hitList, marioBox, columns, movesList } = this.state;
    const can = this.evaluateMarioPosition();

    switch(e.which){
      case 27:
        if(movesList.length < 1) return;
        marioBox = movesList.pop();
        const toadBoxes = hitList.pop();
        const gameIsWon = toadBoxes.length === 0;
        this.setState({ marioBox, movesList, toadBoxes, hitList, gameIsWon });
        return;

      case 37:
        if(!can.MarioMoveLeft) return;
        --marioBox;
        break; 

      case 38:
        if(!can.MarioMoveUp) return;
        marioBox -= columns;
        break; 

      case 39:
        if(!can.MarioMoveRight) return;
        ++marioBox;
        break;

      case 40:
        if(!can.MarioMoveDown) return;
        marioBox += columns;
        break; 

      default:
    }
    this.updateGameBoard(marioBox);
  }
  
  updateGameBoard(marioBox){
    let { hitList, toadBoxes, movesList } = this.state;
    hitList.push(Object.assign([], this.state.toadBoxes));
    movesList.push(this.state.marioBox);
    const knockOutBoxIndex = toadBoxes.lastIndexOf(marioBox);
    knockOutBoxIndex >= 0 && toadBoxes.splice(knockOutBoxIndex, 1);
    const gameIsWon = toadBoxes.length === 0;
    this.setState({ marioBox, movesList, toadBoxes, gameIsWon, hitList });
  }

  letChildrenSetState(newState){
    this.setState(newState);
  }

  render() {
    return (
      <Fragment>
        <GameTab actions={this.actions} data={this.state} />
        <Board actions={this.actions} data={this.state} />
      </Fragment>
    )
  }
}