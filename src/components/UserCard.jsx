import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import BookIcon from '@material-ui/icons/Book';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  avatar: {
    backgroundColor: grey[200],
  },
}));

export const UserCard = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  const formatDate = (date) => {
    return moment(date).format('MMM YYYY');
  };

  const openGitHubLink = (event) => {
    event.preventDefault();
    window.open(user.html_url, '_blank');
  };

  const openUserPage = (event) => {
    event.preventDefault();
    history.push(user.login);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={user.avatar_url}
          ></Avatar>
        }
        action={
          <IconButton
            color="secondary"
            onClick={openGitHubLink}
            aria-label="settings"
          >
            <GitHubIcon />
          </IconButton>
        }
        title={user.name}
        subheader={'joined since ' + formatDate(user.created_at)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {user.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={openUserPage}
          size="small"
          color="primary"
          endIcon={<BookIcon />}
        >
          View Projects
        </Button>
      </CardActions>
    </Card>
  );
};
