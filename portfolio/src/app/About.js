import React from 'react';
import Paper from 'material-ui/Paper'

const style = {
  height: 'auto',
  maxWidth: 500,
  padding: 20,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}

const About = () => (
  <div>
    <Paper style={style} zDepth={1} >
      I studied CS but decided to do something else.
      They say you know what you miss when it's gone, well... they where right.
      I started programming again after a while and kinda did it every day after work up until now.
     </Paper>
     <Paper style={style} zDepth={1} >
       My focus lays on building Web Apps. <a href="http://www.techrepublic.com/article/no-one-downloads-apps-anymore-true-or-false/" target="_blank" rel="noopener">
       Research</a> shows going to the app store and downloading an app is too much work.
       Web Apps are easier to deploy to multiple platforms and are more accessible.
      </Paper>
  </div>
)

export default About;
