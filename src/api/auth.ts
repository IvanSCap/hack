import { AxiosRequestConfig } from 'axios';
import { IUser } from '../modules/users';
import { api } from './api';
import { fetchUsers } from './users';

interface ILoginData {
  email: string | null,
  password: string | null,
}

export const register = (user: IUser, config?: AxiosRequestConfig) => {
  return api.post('/users', user, config).then(({ data }) => {
    return data;
  })
  .catch((data) => {
    throw data;
  });
};

export const login = (loginData: ILoginData, config?: AxiosRequestConfig) => {
  return fetchUsers(loginData, config
  ).then((users) => {
    const user = users?.[0];
    
    if (user) {
      return user;
    }

    // throw { status: 401 };
  });
};
