import React, { useState, useEffect } from 'react';
import fetch from 'cross-fetch';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { materialUiStyles } from '../styles/materialUi.styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';

import { CustomAlert } from '../components/CustomAlert';

export const ProjectPage = () => {
  const gfm = require('remark-gfm');
  const materialUiClasses = materialUiStyles();
  const { username, projectName } = useParams();

  const [loading, setLoading] = useState(true);
  const [readmeData, setReadmeData] = useState({});
  const [searchError, setSearchError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const openGitHubLink = (event) => {
    event.preventDefault();
    window.open(`https://github.com/${username}/${projectName}`, '_blank');
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${projectName}/readme`
      );

      if (response.ok) {
        const readme = await response.json();
        const readmeDataRes = await fetch(readme.download_url);
        const readmeData = await readmeDataRes.text();
        setReadmeData(readmeData);
      } else if (response.status === 404) {
        setSearchError(true);
        setErrorText("Oops! The project's README is not found.");
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
    <div>
      <div className={materialUiClasses.root}>
        <h1>
          {`${projectName} Project`}
          <IconButton onClick={openGitHubLink} color="secondary">
            <LinkIcon />
          </IconButton>
        </h1>
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
            <Box>
              {searchError ? (
                <Box width={400}>
                  <CustomAlert severity="error" alertText={errorText} />
                </Box>
              ) : (
                <ReactMarkdown
                  plugins={[gfm]}
                  children={readmeData}
                  allowDangerousHtml
                />
              )}
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};
