import React, {Component} from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import ContactIcon from 'material-ui/svg-icons/action/perm-contact-calendar'
import PortfolioIcon from 'material-ui/svg-icons/action/dashboard'
import BookIcon from 'material-ui/svg-icons/communication/import-contacts'
import AboutIcon from 'material-ui/svg-icons/social/person'
import ServicesIcon from 'material-ui/svg-icons/action/shopping-cart'

import Portfolio from './Portfolio'
import About from './About'
import Contact from './Contact'
import Services from './Services'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 70
  },
  img: {
    width: '100%'
  },
  bar: {
    position: 'fixed'
  }
}

const muiTheme = getMuiTheme({})

class Main extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      drawerToggle: false,
      page: 'Portfolio',
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(){
    this.setState({
      drawerToggle: !this.state.drawerToggle
    })
  }

  pageSwitcher(page) {
    this.setState({
      page
    })
    this.handleToggle()
  }

  showPage(page){
    switch (page) {
      case 'Portfolio':
        return <Portfolio/>
        break;
      case 'Services':
        return <Services/>
        break;
      case 'About Me':
        return <About/>
        break;
      case 'Get In Touch':
        return <Contact/>
        break;
      default:
        <Portfolio/>
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            style={styles.bar}
            title={this.state.page}
            iconElementLeft={<IconButton><NavigationMenu onTouchTap={this.handleToggle}/></IconButton>}
          />
          <Drawer
            open={this.state.drawerToggle}
            docked={false}
            onRequestChange={this.handleToggle.bind(this)}>
              <img style={styles.img} src="./images/photo-anton.png" />

              <Subheader><h2>DitIsAnton</h2></Subheader>

              <MenuItem
                onTouchTap={() => {this.pageSwitcher('Portfolio')}}
                primaryText="Portfolio"
                leftIcon={<PortfolioIcon />}
              />

              <MenuItem
                onTouchTap={() => {this.pageSwitcher('Services')}}
                primaryText="Services"
                leftIcon={<ServicesIcon />}
              />

              <MenuItem
                onTouchTap={() => {this.pageSwitcher('About Me')}}
                primaryText="About Me"
                leftIcon={<AboutIcon />}
              />

              <MenuItem
                onTouchTap={() => {this.pageSwitcher('Get In Touch')}}
                primaryText="Get In Touch"
                leftIcon={<ContactIcon />}
              />

          </Drawer>

          <div style={styles.container} >
            {this.showPage(this.state.page)}
          </div>

        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
