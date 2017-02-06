import React, { Component } from 'react'
// import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
// import Subheader from 'material-ui/Subheader'
import PortfolioDetail from './Portfolio-detail'
import ProgrammeBooklet from './projects/ProgrammeBooklet'
import FCCChallenges from './projects/FCCChallenges'
import DaysOfCode from './projects/DaysOfCode'
import NuclearCalculator from './projects/NuclearCalculator'
import TalkAbout from './projects/TalkAbout'

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
  },
  FABStyle: {
    position: 'fixed',
    bottom: 25,
    right: 30,
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
    url: "https://antonderegt.github.io/fcc"
  },
  {
    img: "images/100.png",
    title: "#100DaysOfCode",
    author: "Anton de Regt",
    url: "https://github.com/antonderegt/100-days-of-code"
  },
  {
    img: "images/calculator.png",
    title: "Nuclear Calculator",
    author: "Anton de Regt",
    url: "https://antonderegt.github.io/fcc/calculator/build/index.html"
  },
  {
    img: "images/talkabout.png",
    title: "TalkAbout",
    author: "Anton de Regt",
    url: "https://antonderegt.github.io/talkabout"
  }
]



class Portfolio extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: 'Portfolio'
    }
  }

  setPage(page) {
    this.setState({
      page
    })
  }

  showPage(page) {
    switch (page) {
      case 'Portfolio':
        return <PortfolioDetail styles={styles} tilesData={tilesData} onTouchTap={(page) => this.setPage(page)}/>
        break;
      case 'Programme Booklet':
        return <ProgrammeBooklet FABStyle={styles.FABStyle} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case 'FCC-Challenges':
        return <FCCChallenges FABStyle={styles.FABStyle} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case '#100DaysOfCode':
        return <DaysOfCode FABStyle={styles.FABStyle} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case 'Nuclear Calculator':
        return <NuclearCalculator FABStyle={styles.FABStyle} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case 'TalkAbout':
        return <TalkAbout FABStyle={styles.FABStyle} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      default:
        <PortfolioDetail styles={styles} tilesData={tilesData} onTouchTap={() => this.setPage()}/>
    }
  }
  render() {
    return (
      <div style={styles.root}>
        {this.showPage(this.state.page)}
      </div>
    )
  }
}

export default Portfolio
