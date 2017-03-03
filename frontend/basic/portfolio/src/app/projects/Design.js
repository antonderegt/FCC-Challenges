import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const ProgrammeBooklet = (props) => (
  <div>

    <Paper style={props.styles.paper} zDepth={1}>
      <img style={props.styles.img} src="images/csssvg.png" alt="CSS and SVG portfolio"></img>
      <h1>Design</h1>
      <p>I love making images specialized for the web, by using all the good stuff SVG and CSS have to offer. Have a look at my portfolio to see what I built</p>
      <FlatButton href="https://codepen.io/antonderegt/full/qRwyNO" target="_blank" rel="noopener" label="Check it out!" />
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <img style={props.styles.img} src="images/stitch.png" alt="Stitch"></img>
      <h1>Stitch</h1>
      <p>If you want to see more examples check out my design portfolio</p>
      <FlatButton href="https://codepen.io/antonderegt/full/qRwyNO" target="_blank" rel="noopener" label="Click here" />
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>Design Work</h1>
      <p>Do you want a logo, images or whatever artwork? Check out the services page to see what I can do
        for you.
      </p>
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>My Goal</h1>
        <p>
          After I saw a guide about pure CSS images by Michael Mangialardi I was totally hooked on creating these images.
          I joined the #dailycssimages challenge, which means I post an image on Twitter every weekday for 10 weeks straight.
        </p>
        <FlatButton href="https://medium.com/coding-artist/a-beginners-guide-to-pure-css-images-ef9a5d069dd2#.1txb0yyif" target="_blank" rel="noopener" label="#dailycssimages" />
    </Paper>

    <Paper style={props.styles.paper} zDepth={1}>
      <h1>Technology Stack</h1>
      <p>
        SVG<br/>
        CSS<br/>
      Animations with CSS/JS (VueJS)
      </p>
    </Paper>

    <FloatingActionButton secondary={true} style={props.styles.FABStyle} onTouchTap={() => props.onTouchTap()}>
      <ArrowBack />
    </FloatingActionButton>
  </div>
);

export default ProgrammeBooklet
