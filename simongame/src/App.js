import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      clicked: [],
      sequence: [],
      count: 0,
      displayCount: 0,
      clickCount: 0,
      start: false,
      retry: false,
      strict: 'OFF',
      status: 'Click START',
      sgreen: "square green",
      sred: "square red",
      syellow: "square yellow",
      sblue: "square blue"
    }
  }

  randomColor() {
    let colors = ['green', 'red', 'yellow', 'blue']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  generateSequence() {
    let sequence = []
    for(let i = 0; i < 20; i++) {
      sequence.push(this.randomColor())
    }
    console.log(sequence);
    return sequence
  }

  changeMode() {
    if(this.state.strict === 'OFF') {
      this.setState({
        strict: 'ON'
      })
    } else {
      this.setState({
        strict: 'OFF'
      })
    }
  }

  restart() {
    let newSequence = this.generateSequence()
    setTimeout(() => {
      this.setState({
        clicked: [],
        sequence: newSequence,
        count: 0,
        displayCount: 0,
        clickCount: 0,
        start: true,
        retry: false,
        status: 'Good Luck'
      })
      this.displaySequence()
    }, 400)

  }

  retry() {
    this.setState({
      start: true,
      retry: false,
      status: 'Good Luck'
    })
    this.displaySequence()
  }

  start() {
    this.restart()
  }

  playSong(color, resolve, reject) {
    switch (color) {
      case 'green':
        resolve(new Audio('./sounds/simonSound1.mp3').play())
        break;
      case 'red':
        resolve(new Audio('./sounds/simonSound2.mp3').play())
        break;
      case 'yellow':
        resolve(new Audio('./sounds/simonSound3.mp3').play())
        break;
      case 'blue':
        resolve(new Audio('./sounds/simonSound4.mp3').play())
        break;
      default:
    }
  }

  showColor(color) {
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

  displaySequence() {
    if(this.state.displayCount <= this.state.count) {
      this.showColor(this.state.sequence[this.state.displayCount])
      this.setState({
        displayCount: this.state.displayCount + 1,
        start: false
      })
      setTimeout(() => {
        this.setState({start: true})
        this.displaySequence()
      }, 1100)
    } else {
      this.setState({
        displayCount: 0
      })
    }
  }

  handleClick(color) {
    if(this.state.start) {
      var soundFinished = new Promise((resolve, reject) => {
        this.playSong(color, resolve, reject)
      })
      soundFinished.then(() => {
        if(color === this.state.sequence[this.state.clickCount]) {
          // clicked color is correct
          // check if clicked.length = count
          let clicked = this.state.clicked
          clicked.push(color)
          // if true: run clear clicked array
          // and increment count
          // and run displaySequence
          if(clicked.length-1 === this.state.count) {
            this.setState({
              clicked: [],
              count: this.state.count + 1,
              clickCount: 0
            })
            if(clicked.length !== this.state.sequence.length) {
              this.setState({
                start: false
              })
              setTimeout(() => {
                this.setState({start: true})
                this.displaySequence()
              }, 1800)
            } else {
              this.setState({
                start: false,
                status: 'You won! Click START to do another game'
              })
            }
            // if false: add color to clicked
            // and wait for next click
          } else {
            this.setState({
              clicked,
              clickCount: this.state.clickCount + 1
            })
          }
        } else {
          // Clicked color was not correct
          if(this.state.strict === 'ON') {
            this.setState({
              start: false,
              status: 'Aaii, a mistake. You\'ll have to restart'
            })
          } else {
            // Retry same sequence
            this.setState({
              clicked: [],
              clickCount: 0,
              start: false,
              retry: true,
              status: ''
            })
          }
        }
      })
    }
  }

  render() {
    let button = null
    if (this.state.retry) {
      button = <button onClick={() => this.retry()}>Click to Retry</button>;
    } else {
      button = null
    }

    return (
      <div>
        <h1>Simon Game</h1>
        <button onClick={() => {this.restart()}}>Restart</button>
        <button onClick={() => {this.start()}}>START</button>
        <button onClick={() => {this.changeMode()}}>Strict mode: {this.state.strict}</button>
        <div style={{color: 'orange', margin: 20}}>{this.state.status}</div>
        <div>{button}</div>
        <div style={{color: 'orange', margin: 20}}>Count: {this.state.count + 1}</div>
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
    )
  }
}

export default App
