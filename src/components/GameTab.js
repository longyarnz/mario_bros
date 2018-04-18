import React, { Component } from 'react';

export default class GameTab extends Component {
  constructor(props) {
    super(props)
    this.timer = null;
    this.clock = this.clock.bind(this);
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.state = {
      width: 0, height: 0
    }
  }

  componentWillReceiveProps({ data }) {
    data.gameIsWon && clearInterval(this.timer);
  }
  
  createToadBoxes(boardLimit, numberOfToads){
    const toadBoxes = [];
    do{
      const boardIndex = Math.floor(Math.random() * boardLimit);
      toadBoxes.indexOf(boardIndex) < 0 && (
        toadBoxes.push(boardIndex)
      )
    }
    while(toadBoxes.length <= numberOfToads);
    return toadBoxes;
  }

  clock(){
    this.props.actions.setAppState(i => {
      return { time: ++i.time }
    })
  }

  startGame(e){
    e.preventDefault();
    const columns = parseInt(e.target[0].value, 10);
    const rows = parseInt(e.target[1].value, 10);
    const numberOfToads = parseInt(e.target[2].value, 10);
    const boardLimit = rows * columns;
    const toadBoxes = this.createToadBoxes(boardLimit, numberOfToads);
    const marioBox = toadBoxes.shift();
    this.props.actions.setAppState({
      columns, rows, isGameStarted: true,
      numberOfToads, toadBoxes, marioBox,
      hitList: []
    });
    this.timer = setInterval(this.clock, 1000);
  }

  restartGame(){
    this.props.actions.setAppState({
      isGameStarted: false, toadBoxes: [], time: 0,
      movesList: [], marioBox: null, gameIsWon: false,
      numberOfToads: 0, hitList: []
    });
    clearInterval(this.timer);
  }

  InputBox(props){
    const { placeholder, disabled } = props;
    return (
      <input 
        type="number"
        min={5}
        max={10}
        placeholder={placeholder}
        required
        disabled={disabled}
      />
    )
  }
  
  render() {
    const { InputBox } = this;
    const { isGameStarted } = this.props.data;
    return (
      <form onSubmit={this.startGame}>
        <h2>Settings</h2>
        <InputBox 
          placeholder="BOARD WIDTH"
          disabled={isGameStarted}
        />
        <InputBox 
          placeholder="BOARD WIDTH"
          disabled={isGameStarted}
        />
        <InputBox 
          placeholder="NUMBER OF TOADS"
          disabled={isGameStarted}
        />
        <div>
          <button 
            type="submit"
            disabled={isGameStarted}
          >
            START
          </button>
          <button 
            onClick={this.restartGame}
            disabled={!isGameStarted}
          >
            RESTART
          </button>
        </div>
      </form>
    )
  }
}
