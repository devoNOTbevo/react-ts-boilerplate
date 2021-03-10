import { Grid, AppBar, Typography, Toolbar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ServiceContainer } from 'react-service-container';
import { StateProvider } from './state/store';
import AuthService from './providers/auth-service-provider';
import HttpService from './providers/http-service-provider';
import { httpConfig } from './config/config';
import Routes from './components/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import LogoutButton from './components/logout-button';

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
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
          <Router>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Grid container justify="center" wrap="wrap">
                  <Grid item>
                    <Typography variant="h6">Rate My Idea</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <LogoutButton></LogoutButton>
                </Grid>
              </Toolbar>
            </AppBar>
            <Routes />
          </Router>
        </ThemeProvider>
      </ServiceContainer>
    </StateProvider>
  );
}

export default App;
