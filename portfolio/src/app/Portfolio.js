import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import PortfolioDetail from './Portfolio-detail'
import ProgrammeBooklet from './projects/ProgrammeBooklet'
import FCCChallenges from './projects/FCCChallenges'
import DaysOfCode from './projects/DaysOfCode'
import NuclearCalculator from './projects/NuclearCalculator'
import TalkAbout from './projects/TalkAbout'
import TwitterBot from './projects/TwitterBot'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cont: {
    maxWidth: 400
  },
  gridList: {
    width: 500,
    height: 450,
    overFlowY: 'auto'
  },
  paper: {
    height: 'auto',
    maxWidth: 300,
    margin: 10,
    padding: 20,
    textAlign: 'center',
    display: 'inline-block'
  },
  FABStyle: {
    position: 'fixed',
    bottom: 25,
    right: 30,
  },
  img: {
    maxHeight: 300
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
    img: "images/bot.png",
    title: "Twitter Bot",
    author: "Anton de Regt",
    url: "https://github.com/antonderegt/twitter-bot-bootstrap"
  },
  {
    img: "images/calculator.png",
    title: "Nuclear Calculator",
    author: "Anton de Regt",
    url: "https://antonderegt.github.io/fcc/calculator/build/index.html"
  },
  // {
  //   img: "images/talkabout.png",
  //   title: "TalkAbout",
  //   author: "Anton de Regt",
  //   url: "https://antonderegt.github.io/talkabout"
  // }
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
        return <ProgrammeBooklet styles={styles} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case 'FCC-Challenges':
        return <FCCChallenges styles={styles} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case 'Twitter Bot':
        return <TwitterBot styles={styles} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case '#100DaysOfCode':
        return <DaysOfCode styles={styles} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case 'Nuclear Calculator':
        return <NuclearCalculator styles={styles} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      case 'TalkAbout':
        return <TalkAbout styles={styles} onTouchTap={() => this.setPage('Portfolio')}/>
        break;
      default:
        <PortfolioDetail styles={styles} tilesData={tilesData} onTouchTap={() => this.setPage()}/>
    }
  }
  render() {
    return (
      <div style={styles.root}>
        <div style={styles.cont}>
          {this.showPage(this.state.page)}
        </div>
      </div>
    )
  }
}

export default Portfolio
