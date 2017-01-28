import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// @TODO Add pauze button

const BREAK = "BREAK",
      STOPPED = "STOPPED";

class App extends Component {
  constructor(props) {
    super(props)
    let newTimer = this.calcTime(5000)
    this.state = {
      timer: newTimer,
      text: "Start Pomodoro",
      workTime: 5,
      breakTime: 3,
      state: STOPPED,
      disabled: false
    }
  }

  setWorkTime(time) {
    let newWT = this.state.workTime+time
    let newTimer = this.calcTime(newWT*1000)
    if(newWT > 0) {
      this.setState({
        workTime: newWT,
        timer: newTimer
      })
    }
  }

  setBreakTime(time) {
    let newBT = this.state.breakTime+time
    if(newBT > 0) {
      this.setState({
        breakTime: newBT
      })
    }
  }

  calcTime(distance) {
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return (hours + "h " + minutes + "m " + seconds + "s ")
  }

  startTimer(time) {
    this.setState({
      disabled: true
    })

    switch (this.state.state) {
      case STOPPED:
        this.setState({
          text: "Timer running"
        })
        break;
      case BREAK:
        this.setState({
          text: "Take a break"
        })
        break;
      default:
    }

    var countDownDate = new Date().getTime()+(time*1000)+1000;

    let interval = setInterval(() => {
      // Get todays date and time
      let now = new Date().getTime();
      // Find the distance between now an the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let newTime = this.calcTime(distance)

      this.setState({
        timer: newTime,
      })
      // If the count down is finished, write some text
      if (distance < 0) {
        if(this.state.state === STOPPED) {
          clearInterval(interval);
          let newTimer = this.calcTime(this.state.breakTime*1000)
          this.setState({
            timer: newTimer,
            state: BREAK
          })

          this.startTimer(this.state.breakTime);
        } else if (this.state.state === BREAK) {
          clearInterval(interval);
          this.setState({
            timer: "0h 0m 0s",
            text: "Restart timer",
            state: STOPPED,
            disabled: false
          })

        }
      }
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Reactive Pomodoro</h2>
        </div>
        <div>
          <p>Session Length</p><button onClick={() => this.setWorkTime(1)} disabled={this.state.disabled}>+</button><p>{this.state.workTime}</p><button onClick={() => this.setWorkTime(-1)} disabled={this.state.disabled}>-</button>
          <p>Break Length</p><button onClick={() => this.setBreakTime(1)} disabled={this.state.disabled}>+</button><p>{this.state.breakTime}</p><button onClick={() => this.setBreakTime(-1)} disabled={this.state.disabled}>-</button>
          <p>Timer</p><button onClick={() => {this.startTimer(this.state.workTime)}} disabled={this.state.disabled}>{this.state.text}</button>
          <div>{this.state.timer}</div>
        </div>
      </div>
    );
  }
}

export default App;
