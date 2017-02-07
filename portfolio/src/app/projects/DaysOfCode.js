import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const DaysOfCode = (props) => (
  <div>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>#100DaysOfCode</h1>
      <h3>What is this challenge?</h3>
      <p>When commiting to this challenge you have to commit yourself publicly to one hour of coding every day for 100 days straight.</p>
      <h3>What if I miss a day?</h3>
      <p>Of course this will be a likely scenario, just make sure you keep it to a maximum of one day every two weeks</p>
      <FlatButton href="https://medium.freecodecamp.com/join-the-100daysofcode-556ddb4579e4#.g4b5uq1ac" target="_blank" rel="noopener" label="Learn more here"/>
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>My Thoughts</h1>
      <p>The first few days were hard, I had to push myself to start coding. After three days I couldn't stop it! I was hooked. I find this is a common feeling in the community of #100DayCoders.</p>
      <h3>What do I code?</h3>
      <p>I started coding Free Code Camp projects. After a while I just came up with my own projects. Anytime I get stuck I fallback to Free Code Camp, which has enough projects to work on for multiple #100DaysOfCode.</p>
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>My Progress</h1>
      <p>Check out my progress in the #100DaysOfCode challenge: </p>
      <FlatButton href="https://github.com/antonderegt/100-days-of-code" target="_blank" rel="noopener" label="On Github"/>
      <FlatButton href="https://twitter.com/antonderegt" target="_blank" rel="noopener" label="Or Twitter"/>
    </Paper>

    <FloatingActionButton secondary={true} style={props.styles.FABStyle} onTouchTap={() => props.onTouchTap()}>
      <ArrowBack />
    </FloatingActionButton>
  </div>
);

export default DaysOfCode
