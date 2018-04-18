# PseudoCode for Hackerbay React Game

## Intro
The goal of this project is to design a board game using React. The core functionality of the React library is its state implementation, component composition, propagation of props and component lifecycle.

## Game Elements
* Board: A board comprising of ```Boxes``` (squares), arranged side by side.
* Boxes: The boxes make up the ```Board```. The boxes contain elements which represent the state of the game. Each box may contain:
  * a ```Mario``` image or any highlighter object,
  * a ```Marked box```
  * a null area

The goal of the player is to use the highlighter object to scan map through the board and strike out the marked boxes using the least amount of moves possible.

## Implementation
The App component will hold the state of the app. It will encapsulate the following components:
* GameSettings: This is a form component by which the player will set up the game board. It will set up state in the App component. 
* Board: This will hold the state of the game. It will trigger updates in the ```Box``` component.  
  * Row Component: The ```Row``` component encapsulates several ```Box``` component. It receives ```numberOfBoxes, FilledBoxes,  & movesList``` props from the ```Board``` component and it passes them to the ```Box``` component.  
    *  Box: This component will be the main render of the game as this is where the interaction of the game will be made. It will receive    props from ```Row``` component.