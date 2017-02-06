/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
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

// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add'

import Portfolio from './Portfolio'
import Ebooks from './Ebooks'
import About from './About'
import Contact from './Contact'

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
};

const muiTheme = getMuiTheme({})

class Main extends Component {
  constructor(props, context) {
    super(props, context);
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
      case 'eBooks':
        return <Ebooks/>
        break;
      case 'About':
        return <About/>
        break;
      case 'Contact':
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
                onTouchTap={() => {this.pageSwitcher('eBooks')}}
                primaryText="eBooks"
                leftIcon={<BookIcon />}
              />

              <MenuItem
                onTouchTap={() => {this.pageSwitcher('About')}}
                primaryText="About"
                leftIcon={<AboutIcon />}
              />

              <MenuItem
                onTouchTap={() => {this.pageSwitcher('Contact')}}
                primaryText="Contact"
                leftIcon={<ContactIcon />}
              />

          </Drawer>

          <div style={styles.container} >
            {this.showPage(this.state.page)}
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;

/*
FABStyle: {
  position: 'fixed',
  bottom: 25,
  right: 30,
}
<FloatingActionButton secondary={true} style={styles.FABStyle}>
  <ContentAdd />
</FloatingActionButton>
*/
