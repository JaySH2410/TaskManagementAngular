export type TaskStatus = 'Pending' | 'InProgress' | 'Done';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: number;
  categoryName: string;
  createdAt: string;
}

export interface Task2 {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  // categoryId: number;
  categoryName: string;
  // createdAt: string;
}

export interface CreateUpdateTask {
  title: string;
  description: string;
  status: string;
  categoryId: number;
}

export interface TaskFilter {
  status: TaskStatus | 'All';
  categoryId: number | null;
}
