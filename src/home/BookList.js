import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: 'auto'
  }
});

const BookList = props => {
  const { classes, width, books } = props;

  const columns = width === 'xs' ? 2 : width === 'sm' ? 3 : 4;

  return (
    <div className={classes.root}>
      <GridList cellHeight={191} className={classes.gridList} cols={columns}>
        {books.map(book => {
          const authorsString = book.authors.map((author, index) => {
            return `${author}${index === book.authors.length - 1 ? '' : ', '}`;
          });
          return (
            <GridListTile key={book.id} cols={1}>
              {book.imageLinks && (
                <img src={book.imageLinks.thumbnail} alt={book.title} />
              )}
              <GridListTileBar
                title={book.title}
                subtitle={<span>by: {authorsString}</span>}
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

BookList.propTypes = {
  classes: PropTypes.object.isRequired
};

const BookListWithWidth = withWidth()(BookList);

export default withStyles(styles)(BookListWithWidth);
