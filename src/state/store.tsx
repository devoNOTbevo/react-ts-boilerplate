/**
 *  Took lots of inspiration from https://nainacodes.com/blog/global-state-using-react-hooks
 */
import React, { useContext, useReducer, createContext } from 'react';
import { reducer, ActionWithPayload } from '../reducers/reducer';

export type StateContext = {
  user: User;
};
export type User = {
  email: string;
  isAuthenticated: boolean;
  authToken: string;
};

export type Store = {
  state: StateContext;
  dispatch: React.Dispatch<ActionWithPayload>;
};

const defaultState: StateContext = {
  user: {
    email: '',
    isAuthenticated: false,
    authToken: '',
  },
};

const appContext = createContext<Store>({
  state: defaultState,
  dispatch: () => null,
});

export const useStateContext = () => useContext(appContext);

export const StateProvider: React.FC = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <appContext.Provider value={{ state, dispatch }} children={children} />
  );
};
