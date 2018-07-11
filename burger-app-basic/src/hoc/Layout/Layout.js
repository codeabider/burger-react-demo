import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosed = () => {
    this.setState( { showSideDrawer: false } );
  };

  sideDrawerToggle = () => {
    // remember using this approach when our current state depends upon prev state (setState is async)
    this.setState( prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    } );
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggle}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosed}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default Layout;