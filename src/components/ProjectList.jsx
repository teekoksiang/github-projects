import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import BookIcon from '@material-ui/icons/Book';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
}));

export const ProjectList = ({ projects, username, width }) => {
  const classes = useStyles();
  const history = useHistory();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const openGitHubLink = (event, projectUrl) => {
    event.preventDefault();
    window.open(projectUrl, '_blank');
  };

  const openProjectPage = (event, projectName) => {
    event.preventDefault();
    history.push(username + '/' + projectName);
  };

  const formatDate = (date) => {
    return moment(date).format('MMM YYYY');
  };

  return (
    <Box width={width}>
      {projects.map((project, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Box
              width={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className={classes.heading}>
                {`#${(index + 1).toString() + ' ' + project.name}`}
              </Typography>
              <Button
                onClick={(event) => openProjectPage(event, project.name)}
                size="small"
                color="secondary"
                endIcon={<BookIcon />}
              >
                README
              </Button>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box width={1}>
              {project.description && (
                <Box display="block">
                  <Typography>{project.description}</Typography>
                </Box>
              )}
              <Box
                display="flex"
                width={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  {project.language && (
                    <Chip
                      size="small"
                      color="secondary"
                      label={project.language}
                      variant="outlined"
                    />
                  )}
                  <Box display="flex" alignItems="center">
                    {project.language && <Box ml={1} />}
                    <StarOutlineIcon color="secondary" />
                    <Box ml={1} />
                    <Typography variant="body2">
                      {project.stargazers_count}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={(event) => openGitHubLink(event, project.html_url)}
                    aria-label="settings"
                  >
                    <GitHubIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="body2">
                    {formatDate(project.created_at)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
