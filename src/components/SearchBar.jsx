import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import { CustomAlert } from './CustomAlert';
import { UserCard } from './UserCard';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export const SearchBar = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [user, setUser] = useState({});

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchError(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setUser({});

    const response = await fetch('https://api.github.com/users/' + searchQuery);

    if (response.ok) {
      const user = await response.json();
      setUser(user);
    } else if (response.status === 404) {
      setSearchError(true);
      setErrorText('Oops! There is no GitHub user with the username.');
      console.log('Error: ', errorText);
    } else {
      setSearchError(true);
      setErrorText(response.status.toString() + ' ' + response.statusText);
      console.log('Error: ', errorText);
    }
    setLoading(false);
  };

  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="teekoksiang"
          inputProps={{ 'aria-label': 'search github user' }}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={searchQuery}
        />
        {loading && (
          <IconButton className={classes.iconButton} aria-label="search">
            <CircularProgress color="inherit" size={20} />
          </IconButton>
        )}
        {!loading && (
          <IconButton
            onClick={handleSearch}
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        )}
      </Paper>
      <Box mt={2} width={400}>
        {searchError && <CustomAlert severity="error" alertText={errorText} />}

        {Object.entries(user).length !== 0 && <UserCard user={user} />}
      </Box>
    </div>
  );
};
