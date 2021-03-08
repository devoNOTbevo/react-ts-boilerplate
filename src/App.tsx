import { Grid, AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ServiceContainer } from 'react-service-container';
import { StateProvider } from './state/store';
import AuthService from './providers/auth-service-provider';
import HttpService from './providers/http-service-provider';
import { httpConfig } from './config/config';
import React from 'react';
import MainBody from './components/main-body';
import { BrowserRouter as Router } from 'react-router-dom';
const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#000',
    },
  },
});

function App() {
  return (
    <StateProvider>
      <ServiceContainer
        providers={[
          AuthService,
          { provide: HttpService, useValue: new HttpService(httpConfig) },
        ]}
      >
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Grid container justify="center" wrap="wrap">
                <Grid item>
                  <Typography variant="h6">My App</Typography>
                </Grid>
              </Grid>
              <Grid container justify="flex-end" wrap="wrap">
                <Grid item>
                  <Button variant="outlined">Logout</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Router>
            <MainBody />
          </Router>
        </ThemeProvider>
      </ServiceContainer>
    </StateProvider>
  );
}

export default App;
