import React, { Component } from 'react';
import './Grid.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: this.initialStateRandom(),
      rowLength: this.initialRowLength(),
      numberOfRows: this.initialNumberOfRows(),
      state: 'Ready to get alive',
      generations: 0
    }
  }
  initialRowLength() {
    return 20
  }
  initialNumberOfRows() {
    return 20
  }

  clearBoard() {
    this.stop()
    let rowLength = this.state.rowLength
    let numberOfRows = this.state.numberOfRows
    let numberOfSquares = rowLength * numberOfRows
    let clearedArray = []
    for(let i = 0; i < numberOfSquares; i++) {
      clearedArray.push('dead')
    }
    this.setState({
      grid: clearedArray,
      state: 'Board Cleared',
      generations: 0
    })
  }

  newRandomGrid() {
    this.stop()
    this.setState({
      grid: this.initialStateRandom(),
      generations: 0
    })
  }

  initialStateRandom() {
    let rowLength = this.initialRowLength()
    let numberOfRows = this.initialNumberOfRows()
    let numberOfSquares = rowLength * numberOfRows
    let initialAray = []
    for(let i = 0; i < numberOfSquares; i++) {
      if(((Math.random() * 10) + 1) > 9){
        initialAray.push('alive')
      } else {
        initialAray.push('dead')
      }
    }
    return initialAray
  }

  clickHandler(id) {
    let grid = this.state.grid
    if(grid[id] === 'dead') {
      grid[id] = 'alive'
    } else {
      grid[id] = 'dead'
    }
    this.setState({
      grid
    })
    this.checkNeighbours(id, grid)
  }

  checkNeighbours(id, grid) {
    let rowLength = this.state.rowLength
    let numberOfRows = this.state.numberOfRows
    let totalSquares = numberOfRows * rowLength
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
    let grid = this.state.grid
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
      this.state.grid.map((square, id) => {
        let grid = this.state.grid
        let neighbours = this.checkNeighbours(id, grid)
        if(square === 'alive' && neighbours < 2) {
          grid[id] = 'dead'
          this.setState({
            grid
          })
        } else if (square === 'alive' && neighbours > 3) {
          grid[id] = 'dead'
          this.setState({
            grid
          })
        } else if (square === 'dead' && neighbours === 3) {
          grid[id] = 'alive'
          this.setState({
            grid
          })
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
    const grid = this.state.grid.map((square, id) => {
      let createSquare = <div key={id} className={square} onClick={() => this.clickHandler(id)}></div>
      if((id + 1) % this.state.rowLength === 0) {
        createSquare = <div key={id} className="grid"><div className={square} onClick={() => this.clickHandler(id)}></div></div>
      }
      return createSquare
    })
    return (
      <div>
        <div className="buttons">
          <button onClick={() => {this.tick()}}>Run</button>
          <button onClick={() => {this.stop()}}>Pause</button>
          <button onClick={() => {this.clearBoard()}}>Clear</button>
          <button onClick={() => {this.newRandomGrid()}}>Random Grid</button>
        </div>
          <p>Generations: {this.state.generations}</p>
          <h1>{this.state.state}</h1>
        <div className="container">
          <div className="grid">
            { grid }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
