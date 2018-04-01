import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import withRoot from '../withRoot';
import Tabs, { Tab } from 'material-ui/Tabs';
import Avatar from './avatar';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appname: {
    marginRight: 20,
  },
  tabs: {
    flex: 1,
    height: '100%',
  },
  toolbar: {
    'minHeight': 40,
  },
  appbar: {
    padding: 0,
  },
  login: {
    right: 0,
  }
});

class ButtonAppBar extends React.Component {
  state = {
    open: false,
    value: 0,
  };

  renderTab(title, path, newTab=false) {
    // let currentLocation = this.props.location.pathname;
    return (
        // <li className={currentLocation === path ? 'active': ''}>
        //     {!newTab ? <Link to={path}><FormattedMessage id={title} /></Link>: <a href={path} target="_blank" rel="noopener noreferrer"><FormattedMessage id={title} /></a>}
        // </li>
        // Link : /#/path  -> ok
        // href : /path    -> not ok
        <Tab label={title} to={path} component={Link}></Tab>
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar  className={classes.toolbar}>
            
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Avatar />
            <Typography variant="title" color="inherit" className={classes.appname}>
              数院公益时
            </Typography>
            <Tabs value={value} onChange={this.handleChange} className={classes.tabs} centered>
              {this.renderTab('公告', '/publicities')}
              {this.renderTab('公益时详情', '/volunteerTime')}
              {this.renderTab('申请记录', '/applications')}
              {this.renderTab('申诉列表', '/appeals')}
            </Tabs>
            <Button color="inherit" className={classes.login}>Login</Button>
          </Toolbar>
        </AppBar>
        {/* {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>} */}
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ButtonAppBar));