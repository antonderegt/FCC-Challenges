import React from 'react';
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paper: {
    height: 'auto',
    maxWidth: 300,
    margin: 10,
    padding: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  container: {
    maxWidth: 400
  }
}

const About = () => (
  <div style={styles.root}>
    <div style={styles.container}>

      <Paper style={styles.paper} zDepth={1} >
        <h1>Anton</h1>
        <p>
          I love building things, whether it is working on furniture in the shed or programming in... anywhere. That's what I especially like about programming, I can work on it anywhere and whenever I want.
        </p>
      </Paper>

      <Paper style={styles.paper} zDepth={1} >
        <h1>What I'm Working On</h1>
        <p>
          My focus lays on building Web Apps. <a href="http://www.techrepublic.com/article/no-one-downloads-apps-anymore-true-or-false/" target="_blank" rel="noopener">
          Research</a> shows going to the app store and downloading an app is too much work.
          Web Apps are easier to deploy to multiple platforms and are more accessible.
        </p>
      </Paper>

      <Paper style={styles.paper} zDepth={1} >
        <h1>Resume</h1>
        <FlatButton href="https://www.linkedin.com/in/antonderegt" target="_blank" rel="noopener" label="Linkedin"/>
        <FlatButton href="https://github.com/antonderegt" target="_blank" rel="noopener" label="GitHub"/>
      </Paper>

    </div>
  </div>
)

export default About;
