import { Priority } from '../modules/tasks/TaskPrioritiesSelect/Priority.enum';
import { IUser } from '../modules/users';

export interface ITask {
  id?: number | string;
  userId?: IUser['id'];
  name: string | null;
  description: string | null;
  isDone?: boolean | null;
  time?: string | null;
  priority?: Priority | null
};

export interface TaskProgress {
  total: number;
  isDone: number;
  inProgress: number;
};
