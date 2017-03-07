import React, { Component } from 'react';
import './Dungeon.css';

// move through Dungeon, with arrow keys
// make walls
// make the walls unable to walk
// drop monsters in the Dungeon
// drop health in the Dungeon
// walk against an item/monster =>
// fight function or pick up function
// UPDATE stats

let grid = []
let rowLength = 80
let numberOfRows = 40
let totalSquares = rowLength * numberOfRows

class Dungeon extends Component {
  constructor(props) {
    super(props)
    grid = this.initialStateRandom()
    this.state = {
      playerAt: rowLength + 5,
      health: 100,
      weapon: 'Knuckles',
      attack: '7',
      level: 1,
      nextXp: 100,
      dungeon: 1
    }
    grid[this.state.playerAt] = 'square player'
  }

  initialStateRandom() {
    let initialAray = []
    for(let i = 0; i < totalSquares; i++) {
      if(i < rowLength || (i < totalSquares && i > totalSquares - rowLength)) {
        initialAray.push('square wall')
      } else if( i % rowLength === 0) {
        initialAray.push('square wall')
        initialAray[i-1] = 'square wall'
      } else {
        initialAray.push('square openSpace')
      }
    }
    return initialAray
  }

handleKeyDown (event) {
  let currentPlace = this.state.playerAt
  let nextPlace = currentPlace

  switch (event.keyCode) {
    case 39:
      if(currentPlace + 1 < totalSquares && grid[currentPlace + 1] !== 'square wall') {
        nextPlace = currentPlace + 1
      }
      break;
    case 37:
      if(currentPlace - 1 >= 0 && grid[currentPlace - 1] !== 'square wall') {
        nextPlace = currentPlace - 1
      }
      break;
    case 38:
      if(currentPlace - rowLength >= 0 && grid[currentPlace - rowLength] !== 'square wall') {
        nextPlace = currentPlace - rowLength
      }
      break;
    case 40:
      if(currentPlace + rowLength < totalSquares && grid[currentPlace + rowLength] !== 'square wall') {
        nextPlace = currentPlace + rowLength
      }
      break;
    default:
  }

  grid[currentPlace] = 'square openSpace'
  grid[nextPlace] = 'square player'

  this.setState({
    playerAt: nextPlace
  })
}

componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
}

componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
}

  render() {
    const board = grid.map((square, id) => {
      let createSquare = <div key={id} className={square}></div>
      if((id + 1) % rowLength === 0) {
        createSquare = <div key={id} className="grid"><div className={square}></div></div>
      }
      return createSquare
    })
    return (
      <div>
        <div className="stats">
          <p>Health: {this.state.health}</p>
          <p>Weapon: {this.state.weapon}</p>
          <p>Attack: {this.state.attack}</p>
          <p>Level: {this.state.level}</p>
          <p>Next level: {this.state.nextXp} xp</p>
          <p>Dungeon: {this.state.dungeon}</p>
        </div>
        <div className="container">
          <div className="grid gridBorder">
            { board }
          </div>
        </div>
      </div>
    );
  }
}

export default Dungeon;
