import React, { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { MainLayout } from './main-layout';
import { LoginForm } from './login';
import { SignupForm } from './signup';
import { useStateContext } from '../state/store';

const MainBodyWrapper: React.FC = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default function MainBody() {
  const { state } = useStateContext();
  const {
    user: { isAuthenticated },
  } = state;

  return (
    <Switch>
      <Route path="/login">
        <MainBodyWrapper>
          <LoginForm></LoginForm>
        </MainBodyWrapper>
      </Route>
      <Route path="/signup">
        <MainBodyWrapper>
          <div>Signup Form!</div>
        </MainBodyWrapper>
        {/* <SignupForm></SignupForm> */}
      </Route>
      <PrivateRoute>
        <MainBodyWrapper>
          <div>Home Route fuh sho</div>
        </MainBodyWrapper>
      </PrivateRoute>
    </Switch>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const location = useLocation();
  console.log(location);
  const { state } = useStateContext();
  const {
    user: { isAuthenticated },
  } = state;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated || location.pathname === '/login' ? null : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
