import { Injectable, signal, computed, inject } from '@angular/core';
import { CreateUpdateTask, Task } from '../models/task';
import { Category } from '../models/category';
import { TaskSvc } from '../services/task-svc';
import { CategorySvc } from '../services/category-svc';
import { ToastSvc } from './toast-svc';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private taskApi = inject(TaskSvc);
  private categoryApi = inject(CategorySvc);
  private toast = inject(ToastSvc);

  private tasksSignal = signal<Task[]>([]);
  private categoriesSignal = signal<Category[]>([]);

  private statusFilter = signal<'All' | string>('All');
  private categoryFilter = signal<number | null>(null);
  private searchTerm = signal<string>('');

  readonly categories = computed(() => this.categoriesSignal());
  readonly tasks = computed(() =>
    this.tasksSignal().filter(t =>
      (this.statusFilter() === 'All' || t.status === this.statusFilter()) &&
      (this.categoryFilter() === null || t.categoryId === this.categoryFilter()) &&
      (t.title.toLowerCase().includes(this.searchTerm().toLowerCase()))
    )
  );

  loadTasks() {
    this.taskApi.getTasks().subscribe({
      next: res => {
        this.tasksSignal.set(res);
      },
      error: err => {
        this.toast.show(err.message || err || 'Something went wrong while loading tasks', "error");
      }
    });
  }

  loadCategories() {
    this.categoryApi.getCategories().subscribe({
      next: categories => {
        this.categoriesSignal.set(categories);
      },
      error: err => {
        this.toast.show(err.message || err || 'Something went wrong while loading categories', "error");
      }
    });
  }

  addTask(task: CreateUpdateTask) {
    this.taskApi.createTask(task).subscribe({
      next: createdTask => {
        this.tasksSignal.update(tasks => [...tasks, createdTask]);
        this.toast.show('Task created successfully!', 'success');
      },
      error: err => {
        this.toast.show(err.message || err || 'Error creating task', 'error');
      }
    });
  }

  updateTask(id: string, task: Task) {
    this.taskApi.updateTask(id, task).subscribe({
      next: updatedTask => {
        this.tasksSignal.update(tasks =>
          tasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
        );
        this.toast.show('Task updated successfully!', 'success');
      },
      error: err => {
        this.toast.show(err.message || err || 'Error updating task', 'error');
      }
    });
  }

  removeTask(id: number) {
    this.taskApi.deleteTask(id).subscribe({
      next: () => {
        this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
        this.toast.show('Task deleted successfully!', 'success');
      },
      error: err => {
        this.toast.show(err.message || err || 'Error deleting task', 'error');
      }
    });
  }

  // loadTasks() {
  //   this.taskApi.getTasks().subscribe({
  //     next: res => {
  //       this.tasksSignal.set(res);
  //     },
  //     error: err => {
  //       this.toast.show(err || 'Something went wrong while loading tasks', "error");
  //     }
  //   });
  // }


  // loadCategories() {
  //   this.categoryApi.getCategories().subscribe(categories => {
  //     this.categoriesSignal.set(categories);
  //     console.log('categories', categories);
  //   });
  // }

  // addTask(task: CreateUpdateTask) {
  //   this.taskApi.createTask(task).subscribe(createdTask => {
  //     this.tasksSignal.update(tasks => [...tasks, createdTask]);
  //   });
  //   // this.tasksSignal.update(tasks => [...tasks, task]);
  // }

  // updateTask(id: string, task: Task) {
  //   this.taskApi.updateTask(id, task).subscribe(updatedTask => {
  //     this.tasksSignal.update(tasks => tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  //   });
  // }

  // removeTask(id: number) {
  //   this.taskApi.deleteTask(id).subscribe(() => {
  //     this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
  //   });
  // }

  setSearch(term: string) {
    this.searchTerm.set(term);
  }

  filterByStatus(status: string | 'All') {
    this.statusFilter.set(status);
  }

  filterByCategory(categoryId: number | null) {
    this.categoryFilter.set(categoryId);
  }

  public sortColumn = signal<keyof Task | ''>('');
  public sortDirection = signal<'asc' | 'desc'>('asc');

  setSort(column: keyof Task) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }
}


// import { Injectable } from '@angular/core';
// import { signal, computed } from '@angular/core';
// import { Task, TaskStatus } from '../models/task';

// @Injectable({
//   providedIn: 'root',
// })
// export class TaskStore {
//   private tasksSignal = signal<Task[]>([
//     { id: 1, title: 'Task 1', description: 'Description 1', status: 'Pending', categoryId: 1, createdAt: '2022-01-01' },
//     { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress', categoryId: 1, createdAt: '2022-01-01' },
//     { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done', categoryId: 1, createdAt: '2022-01-01' },
//     { id: 4, title: 'Task 4', description: 'Description 4', status: 'Pending', categoryId: 1, createdAt: '2022-01-01' },
//     { id: 5, title: 'Task 5', description: 'Description 5', status: 'Pending', categoryId: 1, createdAt: '2022-01-01' },
//     { id: 6, title: 'Task 6', description: 'Description 6', status: 'Pending', categoryId: 1, createdAt: '2022-01-01' },
//     { id: 7, title: 'Task 7', description: 'Description 7', status: 'Pending', categoryId: 1, createdAt: '2022-01-01' },
//     { id: 8, title: 'Task 8', description: 'Description 8', status: 'Pending', categoryId: 1, createdAt: '2022-01-01' },
//   ]);
//   private statusFilter = signal<TaskStatus | 'All'>('All');
//   private categoryFilter = signal<number | null>(null);
//   private searchTerm = signal<string>('');


//   // readonly tasks = computed(() =>
//   //   this.tasksSignal().filter(t =>
//   //     (this.statusFilter() === 'All' || t.status === this.statusFilter()) &&
//   //     (this.categoryFilter() === null || t.categoryId === this.categoryFilter())
//   //   )
//   // );
//   readonly tasks = computed(() =>
//     this.tasksSignal().filter(t =>
//       (this.statusFilter() === 'All' || t.status === this.statusFilter()) &&
//       (this.categoryFilter() === null || t.categoryId === this.categoryFilter())
//     )
//   );

//   setSearch(term: string) {
//     this.searchTerm.set(term);
//   }

//   setTasks(tasks: Task[]) {
//     this.tasksSignal.set(tasks);
//   }

//   filterByStatus(status: TaskStatus | 'All') {
//     this.statusFilter.set(status);
//   }

//   filterByCategory(categoryId: number | null) {
//     this.categoryFilter.set(categoryId);
//   }

//   removeTask(id: number) {
//     this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
//   }

//   addTask(task: Task) {
//     this.tasksSignal.update(tasks => [...tasks, task]);
//   }

//   updateTask(task: Task) {
//     this.tasksSignal.update(tasks =>
//       tasks.map(t => (t.id === task.id ? task : t))
//     );
//   }
// }
