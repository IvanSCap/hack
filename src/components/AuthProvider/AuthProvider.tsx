import { PropsWithChildren, createContext, useEffect, useReducer } from 'react';
import { initialState, IAuthState } from './initialState';
import { reducer } from './reducer';
import { Types } from './types';
import { IUser } from '../../modules/users';

interface IAuthProviderValues extends IAuthState {
  login: (user: IUser) => void;
}

export const AuthContext = createContext<IAuthProviderValues>({
  ...initialState,

  login: () => {}
});

export const AuthProvider = ({ children } : PropsWithChildren) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const login = (user: IUser) => {
    dispatch({ type: Types.Login, payload: user });
  };
  
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(state));
  }, [ state ]);

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
