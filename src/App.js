import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { SearchUserPage } from './pages/SearchUserPage';
import { UserPage } from './pages/UserPage';
import { ProjectPage } from './pages/ProjectPage';
import { ThemeProvider } from '@material-ui/core';

import { theme } from './styles/materialUi.styles';
import { AppToolbar } from './components/AppToolbar';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppToolbar />
        <Switch>
          <Route exact path="/" render={() => <SearchUserPage />} />
          <Route exact path="/:username" render={() => <UserPage />} />
          <Route
            exact
            path="/:username/:projectName"
            render={() => <ProjectPage />}
          />
          {/* redirect to default route */}
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
};
