import React, { Component } from 'react';
import './Grid.css';

let grid = []
let rowLength = 35
let numberOfRows = 35
let totalSquares = rowLength * numberOfRows

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'Ready to get alive',
      generations: 0
    }
    grid = this.initialStateRandom()
  }

  clearBoard() {
    this.stop()
    let clearedArray = []
    for(let i = 0; i < totalSquares; i++) {
      clearedArray.push('dead')
    }
    grid = clearedArray
    this.setState({
      state: 'Board Cleared',
      generations: 0
    })
  }

  newRandomGrid() {
    this.stop()
    grid = this.initialStateRandom()
    this.setState({
      generations: 0
    })
  }

  initialStateRandom() {
    let initialAray = []
    for(let i = 0; i < totalSquares; i++) {
      if(((Math.random() * 10) + 1) > 9){
        initialAray.push('alive')
      } else {
        initialAray.push('dead')
      }
    }
    return initialAray
  }

  clickHandler(id) {
    if(grid[id] === 'dead') {
      grid[id] = 'alive'
    } else {
      grid[id] = 'dead'
    }
    this.checkNeighbours(id, grid)
  }

  checkNeighbours(id, grid) {
    let neighbours = 0

    // Row above
    if((id - rowLength - 1) >= 0 && grid[(id - rowLength - 1)] === 'alive') {
      neighbours++
    }
    if( (id - rowLength) >= 0 && grid[(id - rowLength)] === 'alive') {
      neighbours++
    }
    if((id - rowLength + 1) >= 0 && grid[(id - rowLength + 1)] === 'alive') {
      neighbours++
    }

    // Same row
    if((id - 1) >= 0 && grid[(id - 1)] === 'alive') {
      neighbours++
    }
    if((id + 1) < totalSquares && grid[id + 1] === 'alive') {
      neighbours++
    }

    // Row below
    if((id + rowLength - 1) < (totalSquares) && grid[(id + rowLength - 1)] === 'alive') {
      neighbours++
    }
    if((id + rowLength) < (totalSquares) && grid[(id + rowLength)] === 'alive') {
      neighbours++
    }
    if((id + rowLength + 1) < (totalSquares) && grid[(id + rowLength + 1)] === 'alive') {
      neighbours++
    }

    return neighbours
  }

  checkAllIsDead() {
    let dead = grid.every(el => el === 'dead')
    if(dead){
      this.setState({
        state: 'Population extinct'
      })
    }
    return dead
  }

  tick() {
    this.setState({
      state: 'Running'
    })
    let x = setInterval(() => {
      if(this.state.state === 'Stopped' || this.checkAllIsDead()) {
        clearInterval(x);
      }
      grid.map((square, id) => {
        let neighbours = this.checkNeighbours(id, grid)
        if(square === 'alive' && neighbours < 2) {
          grid[id] = 'dead'
        } else if (square === 'alive' && neighbours > 3) {
          grid[id] = 'dead'
        } else if (square === 'dead' && neighbours === 3) {
          grid[id] = 'alive'
        }
        return grid
      })
      this.setState({
        generations: this.state.generations + 1
      })
    }, 500)
  }

  stop() {
    this.setState({
      state: 'Stopped'
    })
  }

  render() {
    const board = grid.map((square, id) => {
      let createSquare = <div key={id} className={square} onClick={() => this.clickHandler(id)}></div>
      if((id + 1) % rowLength === 0) {
        createSquare = <div key={id} className="grid"><div className={square} onClick={() => this.clickHandler(id)}></div></div>
      }
      return createSquare
    })
    return (
      <div>
        <p>Generations: {this.state.generations}</p>
        <p>{this.state.state}</p>
        <div className="buttons">
          <button onClick={() => {this.tick()}}>Run</button>
          <button onClick={() => {this.stop()}}>Pause</button>
          <button onClick={() => {this.clearBoard()}}>Clear</button>
          <button onClick={() => {this.newRandomGrid()}}>Random Grid</button>
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

export default App;
