import React from 'react';
import Paper from 'material-ui/Paper'

const style = {
  height: 'auto',
  width: 'auto',
  padding: 20,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}

const Contact = () => (
  <div>
    <Paper style={style} zDepth={1} >
      <a href="https://github.com/antonderegt" target="_blank" rel="noopener"><h1>GitHub</h1></a>
      Check out the projects I am working on right now!<br /><br />
      <a href="https://twitter.com/antonderegt" target="_blank" rel="noopener"><h1>Twitter</h1></a>
      See my progress in the #100DayChallenge.<br /><br />
      <a href="https://linkedin.com/in/antonderegt" target="_blank" rel="noopener"><h1>LinkedIn</h1></a>
      My resume can of course be found here.<br /><br />
      <h2>ditisanton@gmail.com</h2>
     </Paper>
  </div>
)

export default Contact;
