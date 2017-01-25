import React, { Component } from 'react'
import './Calc.css'

// @TODO Add clear button. Add back button.

const PLUS = "PLUS",
      MULTIPLY = "MULTIPLY",
      DIVIDE = "DIVIDE",
      MIN = "MIN";

class Calc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: 0,
      leftNum: null,
      rightNum: null,
      operation: null
    }
  }

  setOperation(op) {
    let operation;

    switch (op) {
      case PLUS:
        operation = '+';
        break;
      case MIN:
        operation = '-';
        break;
      case MULTIPLY:
        operation = 'x';
        break;
      case DIVIDE:
        operation = '/';
        break;
      default:
        operation = null;
    }

    if(op !== null) {
      this.calculate()
    }
    if (op !== this.state.operation){
      this.setState({
        operation: op,
        answer: (this.state.answer + ' ' + operation)
      })
    }
  }

  setNumber(val) {
    if(this.state.operation === null) {
      if(this.state.leftNum === null) {
        this.setState({
          leftNum: val,
          answer: val
        })
      } else {
        let newVal = this.state.leftNum * 10 + val;
        this.setState({
          leftNum: newVal,
          answer: newVal
        })
      }
    } else {
      if(this.state.rightNum === null) {
        this.setState({
          rightNum: val,
          answer: (this.state.answer + ' ' + val)
        })
      } else {
        let newVal = this.state.rightNum * 10 + val;
        this.setState({
          rightNum: newVal,
          answer: (this.state.answer + val)
        })
      }
    }
  }

  calculate() {
    let ans;
    switch (this.state.operation) {
      case PLUS:
        ans = this.state.leftNum + this.state.rightNum;
        break;
      case MIN:
        ans = this.state.leftNum - this.state.rightNum;
        break;
      case MULTIPLY:
        ans = this.state.leftNum * this.state.rightNum;
        break;
      case DIVIDE:
        ans = this.state.leftNum / this.state.rightNum;
        break;
      default:
        ans = this.state.leftNum;
    }
    this.setState({
      answer: ans,
      leftNum: ans,
      rightNum: null,
      operation: null
    })
  }

  back() {

  }

  clear() {
    this.setState({
      answer: 0,
      leftNum: null,
      rightNum: null,
      operation: null
    })
  }
  render() {
    return (
      <div className="calc">
        <div className="flexRow">
          <div className="answer">{this.state.answer}</div>
        </div>
        <div className="flexRow">
          <div className="num" onClick={() => {this.setNumber(1)}}>1</div>
          <div className="num" onClick={() => {this.setNumber(2)}}>2</div>
          <div className="num" onClick={() => {this.setNumber(3)}}>3</div>
        </div>
        <div className="flexRow">
          <div className="num" onClick={() => {this.setNumber(4)}}>4</div>
          <div className="num" onClick={() => {this.setNumber(5)}}>5</div>
          <div className="num" onClick={() => {this.setNumber(6)}}>6</div>
        </div>
        <div className="flexRow">
          <div className="num" onClick={() => {this.setNumber(7)}}>7</div>
          <div className="num" onClick={() => {this.setNumber(8)}}>8</div>
          <div className="num" onClick={() => {this.setNumber(9)}}>9</div>
        </div>
        <div className="flexRow">
          <div className="num red" onClick={() => {this.back()}}>BACK</div>
          <div className="num" onClick={() => {this.setNumber(0)}}>0</div>
          <div className="num red" onClick={() => {this.clear()}}>CLEAR</div>
        </div>
        <div className="flexRow">
          <div className="operation" onClick={() => {this.setOperation(MIN)}}>-</div>
          <div className="operation" onClick={() => {this.setOperation(MULTIPLY)}}>x</div>
          <div className="operation" onClick={() => {this.setOperation(DIVIDE)}}>/</div>
          <div className="operation" onClick={() => {this.setOperation(PLUS)}}>+</div>
        </div>
        <div className="flexRow">
          <div className="operation" onClick={() => {this.calculate()}}>=</div>
        </div>

      </div>
    );
  }
}

export default Calc;
