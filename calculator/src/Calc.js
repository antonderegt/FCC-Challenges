import React, { Component } from 'react';
import './Calc.css';

class Calc extends Component {
  render() {
    return (
      <div className="calc">
        <div className="num">1</div>
        <div className="num">2</div>
        <div className="num">3</div>
        <div className="num">4</div>
        <div className="num">5</div>
        <div className="num">6</div>
        <div className="num">7</div>
        <div className="num">8</div>
        <div className="num">9</div>
        <div className="plus">+</div>
        <div className="min">-</div>
        <div>Answer</div>
      </div>
    );
  }
}

export default Calc;
