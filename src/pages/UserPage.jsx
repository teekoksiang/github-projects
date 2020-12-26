import React, { useState, useEffect } from 'react';
import fetch from 'cross-fetch';
import { useParams } from 'react-router-dom';

import { materialUiStyles } from '../styles/materialUi.styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { CustomAlert } from '../components/CustomAlert';
import { ProjectList } from '../components/ProjectList';

export const UserPage = () => {
  const materialUiClasses = materialUiStyles();
  const { username } = useParams();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      if (response.ok) {
        const projects = await response.json();
        setProjects(projects);
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
    })();
  }, []);

  return (
    <div className={materialUiClasses.root}>
      <h1>{`${username}'s Projects`}</h1>
      <Box mt={2}>
        {loading ? (
          <Box display="flex" alignItems="center">
            <CircularProgress />
            <Box ml={2}>
              <Typography variant="body2">
                Fetching user's projects...
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box width={400}>
            {searchError && (
              <CustomAlert severity="error" alertText={errorText} />
            )}
            {!searchError && projects.length === 0 && (
              <CustomAlert
                severity="info"
                alertText={'The user does not have any project yet!'}
              />
            )}
            {projects.length > 0 && (
              <ProjectList
                width={400}
                projects={projects}
                username={username}
              />
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};
