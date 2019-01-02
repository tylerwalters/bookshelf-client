import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Header from '../../header/Header';
import Navigation from '../../navigation/Navigation';

const styles = theme => ({
  page: {
    paddingBottom: '76px'
  }
});

const Page = ({ children, classes }) => (
  <div className={classes.page}>
    <Header />

    <main className="main-content">{children}</main>

    <Navigation />
  </div>
);

export default withStyles(styles)(Page);
