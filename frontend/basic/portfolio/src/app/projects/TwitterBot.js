import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const TwitterBot = (props) => (
  <div>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>Twitter Bot</h1>
      <p>I built a twitter bot which retweets and likes stuff I find interesting. I told the bot I like ReactJS, ES6 and FreeCodeCamp, so on a set interval the bot searches for interesting tweets to retweet or like.</p>
      <FlatButton href="https://twitter.com/antonderegt" target="_blank" rel="noopener" label="Check out my twitter" />
    </Paper>
    <Paper style={props.styles.paper} zDepth={1}>
      <h1>Build Your Own</h1>
      <p>You can build your own bot by following this guide on Medium</p>
      <FlatButton href="https://medium.freecodecamp.com/easily-set-up-your-own-twitter-bot-4aeed5e61f7f#.nyvo0nb5b" target="_blank" rel="noopener" label="Set up your own" />
    </Paper>
    <FloatingActionButton secondary={true} style={props.styles.FABStyle} onTouchTap={() => props.onTouchTap()}>
      <ArrowBack />
    </FloatingActionButton>
  </div>
);

export default TwitterBot
