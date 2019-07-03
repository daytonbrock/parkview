import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';


class Nav extends Component {

  state = {
    left: false,
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ ...this.state, [side]: open });
  };

  sideList = side => (
    <div 
      styles={{width: 250}}
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <Link className="nav-link" to="/home">
            {/* Show this link if they are logged in or not,
            but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
            {this.props.user.id ? 'Home' : 'Login / Register'}
          </Link>
        </ListItem>
        <ListItem>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </ListItem>
      </List>
      <Divider/>
          {this.props.user.id && (
            <List>
              <ListItem>
                <Link className="nav-link" to="/info">
                  Info Page
                </Link>
              </ListItem>
              <ListItem>
                <LogOutButton className="nav-link"/>
              </ListItem>
            </List>
          )}
    </div>
  );

  render() {
    return (
      <div className="nav">
        <Grid container >
          <Grid item xs={4}>
            <IconButton onClick={this.toggleDrawer('left', true)}>
              <SvgIcon className="menu-button">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </SvgIcon>
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Link to="/home">
              <h2 className="nav-title">ParkView</h2>
            </Link>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
        
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          {this.sideList('left')}
        </Drawer>
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
