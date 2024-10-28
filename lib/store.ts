import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Enums for task state and importance
export enum TaskState {
  Done = "done",
  Doing = "doing",
  ToDo = "to do",
  InProgress = "InProgress",
  Completed = "Completed",
}

export enum TaskImportance {
  High = "high",
  Mid = "mid",
  Small = "small",
  Low = "Low",
}

// Interface to define the shape of a task
export interface Task {
  id: number;
  title: string;
  photoUrl: string;
  description: string;
  state: TaskState;
  importance: TaskImportance;
  completed: boolean;
}

// Initial state: An empty array of tasks
const initTasks: Task[] = [];

// Create the slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: initTasks,
  reducers: {
    // Add a new task
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    // Delete a task by ID
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    // Update task properties by ID
    updateTask: (
      state,
      action: PayloadAction<{ id: number; title: string; completed: boolean }>
    ) => {
      const { id, title, completed } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.completed = completed;
      }
    },
    // Toggle task completion status by ID
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

// Export actions
export const { addTask, deleteTask, updateTask, toggleTaskStatus } =
  tasksSlice.actions;

// Create the store and include the tasks slice
export const makeStore = () => {
  return configureStore({
    reducer: {
      tasks: tasksSlice.reducer, // Add tasks reducer here
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default tasksSlice.reducer; // Export the reducer for use in the store
