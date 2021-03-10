import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainLayout } from './main-layout';
import { LoginForm } from './login';
// import { SignupForm } from './signup';
import { questions } from '../config/questionnaire';
import { PROTECTED_PATHS, PUBLIC_PATHS } from '../config/route-constants';
const { LOGIN_PATH, SIGNUP_PATH, RESET_PATH } = PUBLIC_PATHS;
const { ENTRY_PATH, HOME_PATH } = PROTECTED_PATHS;

const MainBodyWrapper: React.FC = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default function Routes() {
  return (
    <Switch>
      <Route path={SIGNUP_PATH}>
        <MainBodyWrapper>
          <div>Signup Form!</div>
        </MainBodyWrapper>
        {/* <SignupForm></SignupForm> */}
      </Route>
      <Route path={RESET_PATH}>
        <MainBodyWrapper>
          <div>Reset Password Form!</div>
        </MainBodyWrapper>
        {/* <ResetPasswordForm></ResetPasswordForm> */}
      </Route>
      <Route path={LOGIN_PATH}>
        <MainBodyWrapper>
          <LoginForm></LoginForm>
        </MainBodyWrapper>
      </Route>

      <Route path={ENTRY_PATH}>
        <MainBodyWrapper>
          <div>
            <span>TEST</span>
            <pre>{JSON.stringify(questions, null, 2)}</pre>
          </div>
        </MainBodyWrapper>
      </Route>
      <Route path={HOME_PATH}>
        <div>HomePath</div>
      </Route>
    </Switch>
  );
}
