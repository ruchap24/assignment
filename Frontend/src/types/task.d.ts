// src/types/task.d.ts

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export interface TaskData {
  title: string;
  description: string;
  status: string;
  priority: string;
}