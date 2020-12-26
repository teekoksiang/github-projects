import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const AppToolbar = ({ pageTitle }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [title, setTitle] = useState(pageTitle);
  const [username, setUsername] = useState('');
  const [isProjectPage, setIsProjectPage] = useState(false);

  const navigateToHome = () => {
    history.push('/');
  };

  const navigateToUserPage = () => {
    history.push(`/${username}`);
  };

  useEffect(() => {
    extractParams(location.pathname);
  }, [location]);

  const extractParams = (location) => {
    setIsProjectPage(false);
    const words = location.split('/');
    if (words.length === 3 && words[2].length > 0) {
      setTitle(words[2]);
      setUsername(words[1]);
      setIsProjectPage(true);
    } else if (words.length >= 2 && words[1].length > 0) {
      setTitle(words[1]);
    } else {
      setTitle('Search GitHub User');
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={navigateToHome}
            edge="start"
            className={classes.logo}
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {isProjectPage && (
            <Button
              onClick={navigateToUserPage}
              color="inherit"
              startIcon={<AccountCircleIcon />}
            >
              {username}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
