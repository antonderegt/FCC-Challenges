import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    height: 450,
    overFlowY: 'auto'
  }
}

const tilesData = [
  {
    img: "images/nac.png",
    title: "Programme Booklet",
    author: "Anton de Regt",
    url: "https://antonderegt.github.io/nac"
  },
  {
    img: "images/fcc1.png",
    title: "FCC-Challenges",
    author: "Anton de Regt",
    url: "https://antonderegt.github.io/FCC-Challenges"
  },
  {
    img: "images/100.png",
    title: "#100DaysOfCode",
    author: "Anton de Regt",
    url: "https://github.com/antonderegt/100-days-of-code"
  },
  {
    img: "images/talkabout.png",
    title: "TalkAbout",
    author: "Anton de Regt",
    url: "https://antonderegt.github.io/talkabout"
  }
]

const Portfolio = () => (
  <div style={styles.root}>
    <GridList cellHeight={180} style={styles.gridList}>
      <Subheader>List of recent projects</Subheader>
      {tilesData.map(tile => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          onTouchTap={() => {window.open(tile.url)}}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
)

export default Portfolio;
