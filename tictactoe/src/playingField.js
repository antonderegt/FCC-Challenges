import React from 'react'

const PlayingField = (props) => (
  <div>
  <div className="flexRow">
    <div className="square" onClick={() => {props.handleClick(0)}}><h1>{props.clicked[0]}</h1></div>
    <div className="square" onClick={() => {props.handleClick(1)}}><h1>{props.clicked[1]}</h1></div>
    <div className="square" onClick={() => {props.handleClick(2)}}><h1>{props.clicked[2]}</h1></div>
  </div>
  <div className="flexRow">
    <div className="square" onClick={() => {props.handleClick(3)}}><h1>{props.clicked[3]}</h1></div>
    <div className="square" onClick={() => {props.handleClick(4)}}><h1>{props.clicked[4]}</h1></div>
    <div className="square" onClick={() => {props.handleClick(5)}}><h1>{props.clicked[5]}</h1></div>
  </div>
  <div className="flexRow">
    <div className="square" onClick={() => {props.handleClick(6)}}><h1>{props.clicked[6]}</h1></div>
    <div className="square" onClick={() => {props.handleClick(7)}}><h1>{props.clicked[7]}</h1></div>
    <div className="square" onClick={() => {props.handleClick(8)}}><h1>{props.clicked[8]}</h1></div>
  </div>
  <div className="flexRow">
    <h3>Wins by X: {props.winsByX}</h3>
  </div>
  <div className="flexRow">
    <h3>Wins by O: {props.winsByO}</h3>
  </div>
  <div className="flexRow">
    <h3>Draws: {props.draw}</h3>
  </div>
  </div>
);

export default PlayingField
