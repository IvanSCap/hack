import { AxiosRequestConfig } from 'axios';
import { ITask } from '../types/task.types';
import { api } from './api';

export const fetchTasks = (config?: AxiosRequestConfig) => {
  return api.get('/tasks', config).then(({ data }) => {
    return data;
  });
};

export const addTask = (task: ITask, config?: AxiosRequestConfig) => {
  return api.post('/tasks', task, config).then(({ data }) => {
    return data;
  });
};

export const deleteTask = (id: ITask['id'], config?: AxiosRequestConfig) => {
  return api.delete(`/tasks/${id}`, config).then(({ data }) => {
    return data;
  });
};

export const editTask = (task: ITask , config?: AxiosRequestConfig) => {
  return api.put(`/tasks/${task.id}`, task, config).then(({ data }) => {
    return data;
  });
};

export const fetchTask = (id: ITask['id'], config?: AxiosRequestConfig) => {
  return api.get(`/tasks/${id}`, config).then(({ data }) => {
    return data;
  });
};
