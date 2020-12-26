import React from 'react';
import { Alert } from '@material-ui/lab';

export const CustomAlert = ({ severity, alertText }) => {
  return <Alert severity={severity}>{alertText}</Alert>;
};
