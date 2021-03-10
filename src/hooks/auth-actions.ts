import { useEffect } from 'react';
import { useStateContext } from '../state/store';
import { useService } from 'react-service-container';
import AuthService from '../providers/auth-service-provider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ActionType } from '../reducers/reducer';
import { useHistory, useLocation } from 'react-router-dom';
import { HOME_PATH, LOGIN_PATH, ENTRY_PATH } from '../config/route-constants';

export type LoginActions = {
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoading: () => boolean;
};

type LocationState = {
  from?: { pathname: string };
};

function useAuthActions(): LoginActions {
  const { state, dispatch } = useStateContext();
  const authService = useService(AuthService);
  const [user, loading, error] = useAuthState(authService.auth);
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { from = { pathname: HOME_PATH } } = location.state || {};
  const {
    user: { isAuthenticated },
  } = state;

  useEffect(() => {
    async function persistUserDataToStore() {
      if (isAuthenticated) {
        history.replace({ pathname: ENTRY_PATH, state: { from } });
      }
      if (!loading) {
        if (error || user === null) {
          dispatch({
            type: ActionType.SIGN_OUT,
          });
          history.replace({ pathname: LOGIN_PATH, state: { from } });
          console.log('Not authed: ', error);
        } else {
          if (user && !isAuthenticated) {
            const token = await user.getIdToken();
            dispatch({
              type: ActionType.SIGN_IN,
              payload: {
                email: user.email,
                isAuthenticated: true,
                authToken: token,
              },
            });
            history.replace({ pathname: LOGIN_PATH, state: { from } });
          }
        }
      }
    }

    persistUserDataToStore();
  }, [user, loading, error, dispatch, isAuthenticated, history, from]);

  const login = async (email: string, password: string) => {
    try {
      await authService.login(email, password);
    } catch (e) {
      alert(
        `Authentication code: ${e.code || 0} \n\n ${e.message}` ||
          'Something went wrong logging in.'
      );
    }
  };

  const logout = () => {
    authService.logout();
  };

  const isLoading = () => !!loading;

  return {
    login,
    logout,
    isLoading,
  };
}

export { useAuthActions };
