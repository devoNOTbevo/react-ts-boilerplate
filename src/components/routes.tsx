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

export default function Routes() {
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
          <div>Entry Point</div>
        </MainBodyWrapper>
      </PrivateRoute>
    </Switch>
  );
}
