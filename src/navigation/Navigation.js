import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import Add from '@material-ui/icons/Add';

const styles = {
  root: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
};

class Navigation extends React.Component {
  state = {
    value: this.props.location.pathname === '/' ? 'our-books' : 'add-new-book'
  };

  handleChange = (event, value) => {
    this.setState({ value }, this.changePath);
  };

  changePath = () => {
    const { value } = this.state;
    const { history } = this.props;
    const path = value === 'our-books' ? '/' : 'add-new-book';

    history.push(path);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Our Books"
          icon={<LocalLibrary />}
          value="our-books"
        />
        <BottomNavigationAction
          label="Add New Book"
          icon={<Add />}
          value="add-new-book"
        />
      </BottomNavigation>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

const NavigationWithStyles = withStyles(styles)(Navigation);

export default withRouter(NavigationWithStyles);
