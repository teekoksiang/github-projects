import React from 'react';

import { materialUiStyles } from '../styles/materialUi.styles';
import { SearchBar } from '../components/SearchBar';

export const SearchUserPage = () => {
  const materialUiClasses = materialUiStyles();

  return (
    <div className={materialUiClasses.root}>
      <h1>GitHub Username</h1>
      <SearchBar />
    </div>
  );
};
