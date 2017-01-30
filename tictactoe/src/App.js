import React, { Component } from 'react'
import './App.css'

const X = "X",
      O = "O"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ],
      player: X,
      winsByX: 0,
      winsByO: 0,
      timerRunning: false
    }
  }

  handleClick(square) {
    if(this.state.timerRunning === false) {
      let newClicked = this.state.clicked
      if(newClicked[square[0]][square[1]] === null) {
        newClicked[square[0]][square[1]] = this.state.player
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
        this.checkWinner()
      }
    }
  }

  winner() {
    let grid = this.state.clicked
    // Horizontal Rows
    if(grid[0][0] === this.state.player && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) {
      return this.state.player
    } else if(grid[1][0] === this.state.player && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) {
      return this.state.player
    } else if(grid[2][0] === this.state.player && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) {
      return this.state.player
    }
    // Vertical Rows
    else if(grid[0][0] === this.state.player && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) {
      return this.state.player
    } else if(grid[0][1] === this.state.player && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) {
      return this.state.player
    } else if(grid[0][2] === this.state.player && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) {
      return this.state.player
    }
    // Diagonal Rows
    else if(grid[0][0] === this.state.player && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      return this.state.player
    } else if(grid[0][2] === this.state.player && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      return this.state.player
    }
    // No winner
    else {
      return false
    }
  }

  checkWinner() {
    let winner = this.winner()
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
    }
  }

  restart() {
    this.setState({
      clicked: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
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
          <div className="square" onClick={() => {this.handleClick([0,0])}}><h1>{this.state.clicked[0][0]}</h1></div>
          <div className="square" onClick={() => {this.handleClick([0,1])}}><h1>{this.state.clicked[0][1]}</h1></div>
          <div className="square" onClick={() => {this.handleClick([0,2])}}><h1>{this.state.clicked[0][2]}</h1></div>
        </div>
        <div className="flexRow">
          <div className="square" onClick={() => {this.handleClick([1,0])}}><h1>{this.state.clicked[1][0]}</h1></div>
          <div className="square" onClick={() => {this.handleClick([1,1])}}><h1>{this.state.clicked[1][1]}</h1></div>
          <div className="square" onClick={() => {this.handleClick([1,2])}}><h1>{this.state.clicked[1][2]}</h1></div>
        </div>
        <div className="flexRow">
          <div className="square" onClick={() => {this.handleClick([2,0])}}><h1>{this.state.clicked[2][0]}</h1></div>
          <div className="square" onClick={() => {this.handleClick([2,1])}}><h1>{this.state.clicked[2][1]}</h1></div>
          <div className="square" onClick={() => {this.handleClick([2,2])}}><h1>{this.state.clicked[2][2]}</h1></div>
        </div>
        <div className="flexRow">
          <h3>Wins by X: {this.state.winsByX}</h3>
        </div>
        <div className="flexRow">
          <h3>Wins by O: {this.state.winsByO}</h3>
        </div>
      </div>
    );
  }
}

export default App
