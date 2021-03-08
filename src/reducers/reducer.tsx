import { StateContext } from '../state/store';
import _ from 'lodash';

export enum ActionType {
  SIGN_IN = 'Log out',
  SIGN_OUT = 'Sign out',
}

type Payload = {
  payload?: any;
};

export type Action = {
  type: ActionType;
};

export type ActionWithPayload = Payload & Action;

export const reducer: React.Reducer<StateContext, ActionWithPayload> = (
  state: StateContext,
  action: ActionWithPayload
) => {
  const { type, payload } = action;
  const stateCopy = _.cloneDeep(state);
  switch (type) {
    case ActionType.SIGN_IN:
      if (state.user.authToken === '') {
        stateCopy.user.authToken = payload.authToken;
        stateCopy.user.email = payload.email;
        stateCopy.user.isAuthenticated = true;
        return stateCopy;
      } else {
        return state;
      }
    case ActionType.SIGN_OUT:
      return {
        ...stateCopy,
        user: {
          authToken: '',
          isAuthenticated: false,
          email: '',
        },
      };
    default:
      throw new Error(`Action ${action} not found for reducer`);
  }
};
