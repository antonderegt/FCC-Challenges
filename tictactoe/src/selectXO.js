import React from 'react'
import { X, O } from './App.js'

const SelectXO = (props) => (
  <div>
  <div className="flexRow">
    Play with:
    <button onClick={() => {props.selectPlayer(X)}}>X</button>
    <button onClick={() => {props.selectPlayer(O); props.ai()}}>O</button>
  </div>
  </div>
);

export default SelectXO
