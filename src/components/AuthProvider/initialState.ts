import { IUser } from '../../modules/users';

export interface IAuthState {
  isAuthenticated: boolean,
  authToken: string | null,
  user: IUser | null
};

export const initialState: IAuthState = {
  isAuthenticated: false,
  authToken: null,
  user: null,

  ...JSON.parse(localStorage.getItem('auth') || '{}')
};
