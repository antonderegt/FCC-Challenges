import React from 'react';
import Paper from 'material-ui/Paper'

const style = {
  height: 'auto',
  width: 'auto',
  padding: 30,
  margin: 30,
  textAlign: 'center',
  display: 'block'
}

const Services = (props) => (
  <div>

    <Paper style={style} zDepth={1} >
      <h1>
        Services
      </h1>
      <p>
        Do you have an idea for an app? Do you want a professional site to display yourself to the world?
        Want a logo design for your business?
      </p>
      <p>
        Get in touch with me if you want to learn more about how I can help you with your design or web app needs.
      </p>
      <p>
        Read on this page what I can build for you.
      </p>
     </Paper>

     <Paper style={style} zDepth={1} >
       <h1>
         Web apps
       </h1>
       <p>
         I build small and simple web apps optimized for mobile screens with a slow data connection.
         Check out my portfolio (on the homepage) to see what I mean.
       </p>
      </Paper>

     <Paper style={style} zDepth={1} >
       <h1>
         Design
       </h1>
       <p>
         I make fun images optimized for the web.
         Optimized for the web means it doesn't matter how big or small your screen is,
         the images will always be high resolution without the need for a fast data connection.
         Check out my portfolio (on the homepage) to see what I mean.
       </p>
      </Paper>
  </div>
)

export default Services;
