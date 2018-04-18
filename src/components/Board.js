import React, { Component } from 'react';
import { ForLoop } from './Utils';
import Row from './Row';
import mario_win from "../files/mario-win.jpg";

/**
 * @class Board
 * @extends React.Component
 * @description Board component of the game. It renders the game board.
 */
export default class Board extends Component {
  /**
   * @method GamePanel
   * @param {React.Props}
   * @description React component that renders a game panel for number of moves and points scored.
   */
  GamePanel({ data }){
    const { numberOfToads, movesList, toadBoxes, gameIsWon } = data;
    const score = (numberOfToads - toadBoxes.length) * 5;
    return !gameIsWon ? (
      <header>
        <div>
          <span>moves:</span>
          <span>{movesList.length}</span>
        </div>
        <div>
          <span>pts:</span>
          <span>{score}</span>
        </div>
      </header>
    ) : null;
  }

  /**
   * @method GamePlay
   * @param {React.Props}
   * @description React component that renders a game board with boxes, toads and mario.
   * @return {ReactComponent} A ForLoop component that renders Row components.
   */
  GamePlay({ data }){
    return !data.gameIsWon ? (
      <main>
        <ForLoop 
          times={data.rows}
          loopView={i => (
            <Row 
              key={`row ${i}`}
              rowIndex={i}
              data={data}
            />
          )}
        />
      </main>
    ) : null;
  }

  /**
   * @method GamePanel
   * @param {React.Props}
   * @description React component that renders a game panel for number of moves played and points scored.
   */
  ScoreBoard({ data }){
    const { numberOfToads, toadBoxes, movesList, time, gameIsWon } = data;
    const score = (numberOfToads - toadBoxes.length) * 5;
    return gameIsWon ? (
      <main>
        <img src={mario_win} alt="Mario Jubilating" />
        <div className="score-board">
          <div>
            <h3>moves:</h3>
            <span>{movesList.length}</span>
          </div>
          <div>
            <h3>pts:</h3>
            <span>{score}</span>
          </div>
          <div>
            <h3>time:</h3>
            <span>{time}s</span>
          </div>
        </div>
      </main>
    ) : null;
  }

  render() {
    const { GamePanel, GamePlay, ScoreBoard } = this;
    const { data } = this.props;
    const caption = data.isGameWon ? "You have won" : "Board";
    return (
      <section className="board">
        <h2>{caption}</h2>
        <GamePanel data={data} />
        <GamePlay data={data} />
        <ScoreBoard data={data} />
      </section>
    )
  }
}
