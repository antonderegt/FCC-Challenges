import React, { Component } from 'react';
import './App.css';

// @TODO Add pause button

const BREAK = "BREAK",
      STOPPED = "STOPPED";

class App extends Component {
  constructor(props) {
    super(props)
    let newTimer = this.calcTime(25*60000)
    this.state = {
      timer: newTimer,
      text: "Start Pomodoro",
      workTime: 25,
      breakTime: 5,
      state: STOPPED,
      disabled: false
    }
  }

  setWorkTime(time) {
    let newWT = this.state.workTime+(time)
    let newTimer = this.calcTime(newWT*60000)
    if(newWT > 0) {
      this.setState({
        workTime: newWT,
        timer: newTimer
      })
    }
  }

  setBreakTime(time) {
    let newBT = this.state.breakTime+(time)
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
    if(this.state.state === STOPPED && this.state.text !== "Timer running") {
      this.setState({
        text: "Timer running",
        disabled: true
      })
    }

    this.setState({
      disabled: true
    })

    var countDownDate = performance.now()+(time*60000)+1000;

    let interval = setInterval(() => {
      let now = performance.now()
      let distance = countDownDate - now
      let newTime = this.calcTime(distance)

      this.setState({
        timer: newTime
      })

      // Count down is finished
      if (distance < 0) {
        if(this.state.state === STOPPED) {
          clearInterval(interval);
          let newTimer = this.calcTime(this.state.breakTime*60000)
          this.setState({
            timer: newTimer,
            state: BREAK,
            text: "Take a break"
          })
          this.startTimer(this.state.breakTime)
        } else if (this.state.state === BREAK) {
          clearInterval(interval)
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
        <div className="flexContainer">
          <h1>Reactive Pomodoro</h1>
          <div className="flexRow">

            <div className="flexColumn">
              <h3>Session Length</h3>
              <div className="flexRow">
                <button onClick={() => this.setWorkTime(1)} disabled={this.state.disabled}><b>+</b></button>
                {this.state.workTime}<button onClick={() => this.setWorkTime(-1)} disabled={this.state.disabled}><b>-</b></button>
              </div>
            </div>

            <div className="flexColumn">
              <h3>Break Length</h3>
              <div className="flexRow">
                <button onClick={() => this.setBreakTime(1)} disabled={this.state.disabled}><b>+</b></button>
                {this.state.breakTime}<button onClick={() => this.setBreakTime(-1)} disabled={this.state.disabled}><b>-</b></button>
              </div>
            </div>

          </div>
            <h3>Pomodoro</h3>
              <button onClick={() => {this.startTimer(this.state.workTime)}} disabled={this.state.disabled}><b>{this.state.text}</b></button>
            <h2>{this.state.timer}</h2>
        </div>
      </div>
    );
  }
}

export default App;
