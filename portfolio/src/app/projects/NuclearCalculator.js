import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

const NuclearCalculator = (props) => (
  <div>
    <h1>
    NuclearCalculator
    </h1>
    <h1>
      Promgramme Booklet
    </h1>
    <p>
      Promgramme Booklet
    </p>
    <p>
      Promgramme Booklet
    </p>
    <FloatingActionButton secondary={true} style={props.FABStyle} onTouchTap={() => props.onTouchTap()}>
      <ArrowBack />
    </FloatingActionButton>
  </div>
);

export default NuclearCalculator
