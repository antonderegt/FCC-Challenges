import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const START = "START",
      BREAK = "BREAK",
      STOPPED = "STOPPED";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: "0h 25m 0s",
      text: "Start Pomodoro",
      workTime: 5000,
      breakTime: 5000,
      state: START
    }
  }

  setTimer(workTime, breakTime) {
    this.setState({
      workTime,
      breakTime
    })
  }

  startTimer(time) {
    // Set the date we're counting down to
    var countDownDate = new Date().getTime()+time;//1500000;//new Date("Jan 5, 2018 15:37:25").getTime();

    if(this.state.state === START) {
      this.setState({
        text: "Timer running"
      })
    } else if(this.state.state === BREAK) {
      this.setState({
        text: "Take a break"
      })
    }

    let interval = setInterval(() => {
      // Get todays date and time
      let now = new Date().getTime();
      // Find the distance between now an the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display the result in the element with id="demo"
      let newTime = hours + "h " + minutes + "m " + seconds + "s ";
      this.setState({
        timer: newTime,
      })
      // If the count down is finished, write some text
      if (distance < 0) {
        if(this.state.state === START) {
          this.setState({
            timer: "0h 0m 0s",
            text: "Break",
            state: BREAK
          })
          clearInterval(interval);
          this.startTimer(this.state.breakTime);
        } else if (this.state.state === BREAK) {
          this.setState({
            timer: "0h 0m 0s",
            text: "Restart timer",
            state: STOPPED
          })
          clearInterval(interval);
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
          <p>Timer is set for 25 minutes.</p>
          <button onClick={() => {this.startTimer(5000)}}>{this.state.text}</button>
          <div>{this.state.timer}</div>
          <button onClick={() => {this.setTimer(5000, 3000)}}>Set 5s 3s</button>
        </div>
      </div>
    );
  }
}

export default App;
