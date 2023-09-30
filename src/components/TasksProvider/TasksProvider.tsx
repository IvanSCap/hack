import { createContext, ReactNode, useContext, useEffect, useReducer, useRef } from 'react';
import { ITask } from '../../types/task.types';
import * as tasksApi from '../../api/tasks';
import { reducer } from './reducer';
import { initialState, ITasksState } from './initialState';
import { Types } from './types';
import { ITasksFilter } from './ITasksFilter';
import { AuthContext } from '../AuthProvider';

interface ITasksProviderProps {
  children: ReactNode;
};

interface ITasksProviderValue extends ITasksState {
  addTask: (task: ITask) => void;
  deleteTask: (task: ITask) => void;
  applyFilter: (filter: ITasksFilter) => void;
  fetchTasks: (filter: ITasksFilter) => void;
  editTask: (task: ITask) => void;
};

export const TasksContext = createContext<ITasksProviderValue>({
  ...initialState,

  addTask: () => {},
  deleteTask: () => {},
  applyFilter: () => {},
  fetchTasks: () => {},
  editTask: () => {}
});

export const TasksProvider = ({ children }: ITasksProviderProps) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const fetchTasksAbortController = useRef(new AbortController());
  const { user } = useContext(AuthContext);

  const addTask = (task: ITask) => {
    tasksApi.addTask({
      userId: user?.id,

      ...task
    }).then((task) => {
      dispatch({ type: Types.AddTask, payload: task });
    });
  };

  const deleteTask = (task: ITask) => {
    dispatch({ type: Types.DeleteTask, payload: task });
  };

  const applyFilter = (filter: ITasksFilter) => {
    dispatch({ type: Types.ApplyFilter, payload: filter });
  };

  const fetchTasks = (filter?: ITasksFilter) => {
    tasksApi.fetchTasks({
      params: {
        userId: user?.id,

        ...filter
      },
      signal: fetchTasksAbortController.current.signal
    }).then((tasks) => {
      dispatch({ type: Types.FetchTasks, payload: tasks });
    }).catch((error) => {
    });
  };

  const editTask = (task: ITask) => {
    dispatch({ type: Types.EditTask, payload: task });
  };

  const providerValue = {
    ...state,

    addTask,
    deleteTask,
    fetchTasks,
    editTask,
    applyFilter
  };
  
  useEffect(() => {
    fetchTasks();

    return () => {
      fetchTasksAbortController.current.abort();
    };
  }, []);

  return (
    <TasksContext.Provider value={providerValue}>
      {children}
    </TasksContext.Provider>
  );
};
