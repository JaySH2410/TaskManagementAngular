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