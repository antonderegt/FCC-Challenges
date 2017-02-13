import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const TalkAbout = (props) => (
  <div>

    <Paper style={props.styles.paper} zDepth={1}>
      <img style={props.styles.img} src="images/talkabout.png" alt="Talk About"></img>
      <h1>TalkAbout</h1>
      <p>Image you're with friends, you've talked for hours, there is literally nothing more to discuss. Or is there? TalkAbout shows you topics or questions you can discuss or think about on your own.</p>
      <FlatButton href="https://antonderegt.github.io/talkabout" target="_blank" rel="noopener" label="Ready to converse?" />
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>Still In Progress</h1>
      <p>
        
      </p>
    </Paper>

    <FloatingActionButton secondary={true} style={props.styles.FABStyle} onTouchTap={() => props.onTouchTap()}>
      <ArrowBack />
    </FloatingActionButton>
  </div>
);

export default TalkAbout
