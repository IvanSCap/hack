import { AxiosRequestConfig } from 'axios';
import { api } from './api';

export const fetchUsers = (config?: AxiosRequestConfig) => {
  return api.get('/users', config).then(({ data }) => {
    return data;
  });
};
