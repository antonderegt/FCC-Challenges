import React, { Component } from 'react'
import './App.css'
import PlayingField from './playingField'
import SelectXO from './selectXO'

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
      timerRunning: false,
      selectedPlayer: 0
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
          this.ai()
        } else {
          this.setState({
            player: X
          })
        }
        this.score()
      }
    }
  }

  ai() {
    this.setState({
      player: O
    })
    setTimeout(() => {
      this.handleClick(this.state.clicked.indexOf(null))
    }, 400)
  }

  selectPlayer(selectedPlayer) {
    this.setState({
      selectedPlayer
    })
  }

  checkWinner() {
    let grid = this.state.clicked
    // Horizontal Rows
    if(grid[0] === X && grid[1] === X && grid[2] === X) {
      return X
    } else if(grid[3] === X && grid[4] === X && grid[5] === X) {
      return X
    } else if(grid[6] === X && grid[7] === X && grid[8] === X) {
      return X
    }
    if(grid[0] === O && grid[1] === O && grid[2] === O) {
      return O
    } else if(grid[3] === O && grid[4] === O && grid[5] === O) {
      return O
    } else if(grid[6] === O && grid[7] === O && grid[8] === O) {
      return O
    }
    // Vertical Rows
    if(grid[0] === X && grid[3] === X && grid[6] === X) {
      return X
    } else if(grid[1] === X && grid[4] === X && grid[7] === X) {
      return X
    } else if(grid[2] === X && grid[5] === X && grid[8] === X) {
      return X
    }
    if(grid[0] === O && grid[3] === O && grid[6] === O) {
      return O
    } else if(grid[1] === O && grid[4] === O && grid[7] === O) {
      return O
    } else if(grid[2] === O && grid[5] === O && grid[8] === O) {
      return O
    }
    // Diagonal Rows
    if(grid[0] === X && grid[4] === X && grid[8] === X) {
      return X
    } else if(grid[2] === X && grid[4] === X && grid[6] === X) {
      return X
    }
    if(grid[0] === O && grid[4] === O && grid[8] === O) {
      return O
    } else if(grid[2] === O && grid[4] === O && grid[6] === O) {
      return O
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
    if(this.state.selectedPlayer === X) {
      this.setState({
        clicked: [
          null,null,null, null,null,null, null,null,null
        ],
        player: X,
        timerRunning: false
      })
    } else {
      this.setState({
        clicked: [
          null,null,null, null,null,null, null,null,null
        ],
        player: X,
        timerRunning: false
      })
      // Computer has first move
      this.ai()
    }
  }

  checkPlayerSelected() {
    switch (this.state.selectedPlayer) {
      case 0:
        return <SelectXO selectPlayer={(player) => this.selectPlayer(player)} ai={() => this.ai()} />
        break;
      case 'O':
      case 'X':
        return <PlayingField
          handleClick={(player) => this.handleClick(player)}
          clicked={this.state.clicked}
          winsByX={this.state.winsByX}
          winsByO={this.state.winsByO}
          draw={this.state.draw}
          />
        break;
      default:
        return <PlayingField
          handleClick={(player) => this.handleClick(player)}
          clicked={this.state.clicked}
          winsByX={this.state.winsByX}
          winsByO={this.state.winsByO}
          draw={this.state.draw}
          />
    }
  }

  render() {
    return (
      <div className="flexContainer">
        <div className="flexRow">
          <h1>TicTacToe</h1>
        </div>
        {this.checkPlayerSelected()}
      </div>
    );
  }
}

export default App
