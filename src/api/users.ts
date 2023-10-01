import { AxiosRequestConfig } from 'axios';
import { api } from './api';

export const fetchUsers = (dataToSend?: any, config?: AxiosRequestConfig) => {
  return api.post('/users', dataToSend, config).then(({ data }) => {
    return data;
  });
};
