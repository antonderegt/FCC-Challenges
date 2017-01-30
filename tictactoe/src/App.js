import React, { Component } from 'react'
import './App.css'

const X = "X",
      O = "O"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: [
        null,null,null,null,null,null,null,null,null
      ],
      player: X,
      winsByX: 0,
      winsByO: 0,
      draw: 0,
      timerRunning: false
    }
  }

  handleClick(square) {
    if(this.state.timerRunning === false) {
      let newClicked = this.state.clicked
      if(newClicked[square] === null) {
        newClicked[square] = this.state.player
        this.setState({
          clicked: newClicked
        })
        if (this.state.player === X) {
          this.setState({
            player: O
          })
        } else {
          this.setState({
            player: X
          })
        }
        this.score()
      }
    }
  }

  checkWinner() {
    let grid = this.state.clicked
    // Horizontal Rows
    if(grid[0] === this.state.player && grid[0] === grid[1] && grid[1] === grid[2]) {
      return this.state.player
    } else if(grid[3] === this.state.player && grid[3] === grid[4] && grid[4] === grid[5]) {
      return this.state.player
    } else if(grid[6] === this.state.player && grid[6] === grid[7] && grid[7] === grid[8]) {
      return this.state.player
    }
    // Vertical Rows
    else if(grid[0] === this.state.player && grid[0] === grid[3] && grid[3] === grid[6]) {
      return this.state.player
    } else if(grid[1] === this.state.player && grid[1] === grid[4] && grid[4] === grid[7]) {
      return this.state.player
    } else if(grid[2] === this.state.player && grid[2] === grid[5] && grid[5] === grid[8]) {
      return this.state.player
    }
    // Diagonal Rows
    else if(grid[0] === this.state.player && grid[0] === grid[4] && grid[4] === grid[8]) {
      return this.state.player
    } else if(grid[6] === this.state.player && grid[6] === grid[4] && grid[4] === grid[2]) {
      return this.state.player
    }
    // No winner
    else {
      return false
    }
  }

  checkDraw() {
    return this.state.clicked.every(square => square !== null)
  }

  score() {
    let winner = this.checkWinner()
    if(winner !== false) {
      if(winner === X) {
        this.setState({
          winsByX: this.state.winsByX + 1
        })
      } else if (winner === O) {
        this.setState({
          winsByO: this.state.winsByO + 1
        })
      }
      this.setState({
        timerRunning: true
      })
      setTimeout(() => {
        this.restart()
      }, 3000)
    } else {
      if(this.checkDraw()) {
        this.setState({
          draw: this.state.draw + 1
        })
        setTimeout(() => {
          this.restart()
        }, 3000)
      }
    }
  }

  restart() {
    this.setState({
      clicked: [
        null,null,null, null,null,null, null,null,null
      ],
      player: X,
      timerRunning: false
    })
  }
  render() {
    return (
      <div className="flexContainer">
        <div className="flexRow">
          <h1>TicTacToe</h1>
        </div>
        <div className="flexRow">
          <div className="square" onClick={() => {this.handleClick(0)}}><h1>{this.state.clicked[0]}</h1></div>
          <div className="square" onClick={() => {this.handleClick(1)}}><h1>{this.state.clicked[1]}</h1></div>
          <div className="square" onClick={() => {this.handleClick(2)}}><h1>{this.state.clicked[2]}</h1></div>
        </div>
        <div className="flexRow">
          <div className="square" onClick={() => {this.handleClick(3)}}><h1>{this.state.clicked[3]}</h1></div>
          <div className="square" onClick={() => {this.handleClick(4)}}><h1>{this.state.clicked[4]}</h1></div>
          <div className="square" onClick={() => {this.handleClick(5)}}><h1>{this.state.clicked[5]}</h1></div>
        </div>
        <div className="flexRow">
          <div className="square" onClick={() => {this.handleClick(6)}}><h1>{this.state.clicked[6]}</h1></div>
          <div className="square" onClick={() => {this.handleClick(7)}}><h1>{this.state.clicked[7]}</h1></div>
          <div className="square" onClick={() => {this.handleClick(8)}}><h1>{this.state.clicked[8]}</h1></div>
        </div>
        <div className="flexRow">
          <h3>Wins by X: {this.state.winsByX}</h3>
        </div>
        <div className="flexRow">
          <h3>Wins by O: {this.state.winsByO}</h3>
        </div>
        <div className="flexRow">
          <h3>Draws: {this.state.draw}</h3>
        </div>
      </div>
    );
  }
}

export default App
