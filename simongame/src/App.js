import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clicked: [],
      sequence: ['green'],
      turn: -1,
      sgreen: "square green",
      sred: "square red",
      syellow: "square yellow",
      sblue: "square blue"
    }
  }

  demo(color) {
    switch (color) {
      case 'green':
        this.setState({
          sgreen: "square green activated"
        })
        new Audio('./sounds/simonSound1.mp3').play()
        setTimeout(() => {
          this.setState({
            sgreen: "square green"
          })
        }, 500)
        break;
      case 'red':
        this.setState({
          sred: "square red activated"
        })
        new Audio('./sounds/simonSound2.mp3').play()
        setTimeout(() => {
          this.setState({
            sred: "square red"
          })
        }, 500)
        break;
      case 'yellow':
        this.setState({
          syellow: "square yellow activated"
        })
        new Audio('./sounds/simonSound3.mp3').play()
        setTimeout(() => {
          this.setState({
            syellow: "square yellow"
          })
        }, 500)
        break;
      case 'blue':
        this.setState({
          sblue: "square blue activated"
        })
        new Audio('./sounds/simonSound4.mp3').play()
        setTimeout(() => {
          this.setState({
            sblue: "square blue"
          })
        }, 500)
        break;
      default:
    }
  }

  handleClick(color) {

    this.playSong(color)
    let turn = this.state.turn + 1
    let clicked = this.state.clicked
    clicked.push(color)
    this.setState({
      clicked,
      turn
    })
    if(this.state.clicked[turn] === this.state.sequence[turn]) {
      alert('correct', this.state.clicked, this.state.sequence);
    } else {
      alert('errrrr', this.state.clicked, this.state.sequence);
    }
  }

  playSong(color) {
    switch (color) {
      case 'green':
        new Audio('./sounds/simonSound1.mp3').play()
        break;
      case 'red':
        new Audio('./sounds/simonSound2.mp3').play()
        break;
      case 'yellow':
        new Audio('./sounds/simonSound3.mp3').play()
        break;
      case 'blue':
        new Audio('./sounds/simonSound4.mp3').play()
        break;
      default:
    }
  }

  restart() {
    this.setState({
      clicked: [],
      sequence: ['green'],
      turn: -1
    })
  }

  render() {
    return (
      <div>
        <h1>Simon Game</h1>
        <button onClick={() => {this.restart()}}>Restart</button>
        <button onClick={() => {this.demo('green')}}>Start</button>
        <div className="flexContainer">
          <div className="flexRow">
            <div className={this.state.sgreen}
                  onMouseDown={() => this.handleClick('green')}></div>
            <div className={this.state.sred}
                  onMouseDown={() => this.handleClick('red')}></div>
          </div>
          <div className="flexRow">
            <div className={this.state.syellow}
                  onMouseDown={() => this.handleClick('yellow')}></div>
            <div className={this.state.sblue}
                  onMouseDown={() => this.handleClick('blue')}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
