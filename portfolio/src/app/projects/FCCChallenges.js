import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const FCCChallenges = (props) => (
  <div>
    
    <Paper style={props.styles.paper} zDepth={1}>
      <h1>What Is FreeCodeCamp?</h1>
        <p>FCC for short is an open source community that helps you learn to code.</p>
      <h3>How do you help me learn to code?</h3>
        <p>You can work through self-paced coding challenges, build projects, and earn certificates. FCC also connects you with people in your city so you can code together.</p>
      <h3>Can freeCodeCamp help me get a job as a software developer?</h3>
        <p>Yes. Thousands of people have gotten software developer jobs after joining their open source community.</p>
      <FlatButton href="https://freeCodeCamp.com/" target="_blank" rel="noopener" label="Go to FCC" />
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>What Did I Learn?</h1>
      <p>I built a lot of projects which taught me a lot about coding, or better said; which taugth me to learn myself to code new stuff.</p>
      <h3>Check out my projects</h3>
      <FlatButton href="https://freeCodeCamp.com/antonderegt" target="_blank" rel="noopener" label="FCC Page" />
      <FlatButton href="https://github.com/antonderegt/fcc" target="_blank" rel="noopener" label="Github" />
    </Paper>

    <FloatingActionButton secondary={true} style={props.styles.FABStyle} onTouchTap={() => props.onTouchTap()}>
      <ArrowBack />
    </FloatingActionButton>
  </div>
);

export default FCCChallenges
