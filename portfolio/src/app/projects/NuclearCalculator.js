import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const NuclearCalculator = (props) => (
  <div>

    <Paper style={props.styles.paper} zDepth={1}>
      <img style={props.styles.img} src="images/calculator.png" alt="Nuclear Calculator"></img>
      <h1>Nuclear Calculator</h1>
      <p>A super simple and effective calculator.</p>
      <FlatButton href="https://antonderegt.github.io/fcc/calculator/build/index.html" target="_blank" rel="noopener" label="Punch in some numbers" />
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>Features</h1>
      <p>
        Really fast<br/>
        Big buttons<br/>
        Works on mobile
      </p>
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>Technology Stack</h1>
      <p>
        ReactJS<br/>
        Redux<br/>
        Create-React-App<br/>
      </p>
    </Paper>

    <FloatingActionButton secondary={true} style={props.styles.FABStyle} onTouchTap={() => props.onTouchTap()}>
      <ArrowBack />
    </FloatingActionButton>
  </div>
);

export default NuclearCalculator
