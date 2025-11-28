import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStore } from '../../services/task-store';
import { Task } from '../../models/task';
import { TaskStatus } from '../../models/task';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastSvc } from '../../services/toast-svc';


@Component({
  selector: 'app-tasks-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks-management.html',
  styleUrl: './tasks-management.css',
})
export class TasksManagement {

  taskStore = inject(TaskStore);

  tasks = this.taskStore.tasks;
  categories = this.taskStore.categories;
  statuses: TaskStatus[] = ['Pending', 'InProgress', 'Done'];


  selectedStatus: string = "";
  selectedCategory: number | null = null;
  searchQuery: string = '';

  constructor(private route: Router, private toast: ToastSvc) {
    this.taskStore.loadTasks();
    this.taskStore.loadCategories();

  }

  search(query: string) {
    this.searchQuery = query;
    this.taskStore.setSearch(query);
  }

  filterStatus(status: string) {
    this.selectedStatus = status;
    this.taskStore.filterByStatus(status === '' ? 'All' : status);
  }

  filterCategory(categoryId: any) {
    this.selectedCategory = categoryId ? Number(categoryId) : null;
    this.taskStore.filterByCategory(this.selectedCategory);
  }

  clearFilters() {
    this.selectedStatus = 'All';
    this.selectedCategory = null;
    this.searchQuery = '';
    this.taskStore.setSearch('');
    this.taskStore.filterByStatus('All');
    this.taskStore.filterByCategory(null);
  }

  sort(column: keyof Task) {
    this.taskStore.setSort(column);
  }

  getSortIcon(column: keyof Task) {
    const currentColumn = this.taskStore.sortColumn();
    if (currentColumn !== column) return '';
    return this.taskStore.sortDirection() === 'asc' ? '▲' : '▼';
  }

  deleteTask(id: number) {
    this.taskStore.removeTask(id);
    // this.toast.show('Task deleted successfully!', 'success');
  }

  addTask() {
    this.route.navigate(['/tasks/new']);
  }


  addCategory() {
    this.route.navigate(['/categories/new']);
  }

  editTask(task: Task) {
    this.route.navigate(['/tasks', task.id, 'edit']);
  }
}
