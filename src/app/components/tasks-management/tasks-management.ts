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
  templateUrl: './tasks-management2.html',
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

  // NEW sorting entry point
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
    // this.toast.show('Create new task form opened', 'info');
    // alert('open form modal');
  }


  addCategory() {
    this.route.navigate(['/categories/new']);
    // alert('open form modal');
  }

  editTask(task: Task) {
    // alert('edit: ' + task.title);
    this.route.navigate(['/tasks', task.id, 'edit']);
    // this.toast.show('Edit mode activated', 'info');
  }
}

// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Task2 } from '../../models/task';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-tasks-management',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './tasks-management2.html',
//   styleUrl: './tasks-management.css',
// })
// export class TasksManagement {
//   tasks: Task2[] = [
//     { id: 1, title: 'Task 1', description: 'Description 1', status: 'Pending', categoryName: 'Work' },
//     { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress', categoryName: 'Work' },
//     { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done', categoryName: 'Personal' },
//     { id: 4, title: 'Task 4', description: 'Description 4', status: 'Pending', categoryName: 'Other' }
//   ];

//   categories = ['Work', 'Personal', 'Other'];
//   filteredTasks = [...this.tasks];

//   sortColumn: keyof Task2 | '' = '';
//   sortDirection: 'asc' | 'desc' = 'asc';

//   sortBy(column: keyof Task2) {
//     if (this.sortColumn === column) {
//       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//     } else {
//       this.sortColumn = column;
//       this.sortDirection = 'asc';
//     }

//     this.filteredTasks.sort((a, b) => {
//       const valueA = a[column]?.toString().toLowerCase();
//       const valueB = b[column]?.toString().toLowerCase();

//       if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
//       if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }

//   getSortIcon(column: keyof Task2) {
//     if (this.sortColumn !== column) return '';
//     return this.sortDirection === 'asc' ? '▲' : '▼';
//   }

//   selectedStatus: string = 'All';
//   selectedCategory: string = '';
//   searchQuery: string = '';

//   applyFilters() {
//     this.filteredTasks = this.tasks.filter(task => {
//       const matchesStatus =
//         this.selectedStatus === 'All' || task.status === this.selectedStatus;

//       const matchesCategory =
//         this.selectedCategory === '' || task.categoryName === this.selectedCategory;

//       const matchesSearch =
//         task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//         task.description.toLowerCase().includes(this.searchQuery.toLowerCase());

//       return matchesStatus && matchesCategory && matchesSearch;
//     });
//   }

//   search(query: string) {
//     this.searchQuery = query.toLowerCase();
//     this.applyFilters();
//   }

//   filterStatus(status: string) {
//     this.selectedStatus = status;
//     this.applyFilters();
//   }

//   clearFilters() {
//     this.selectedStatus = 'All';
//     this.selectedCategory = '';
//     this.searchQuery = '';
//     this.applyFilters();
//   }

//   filterCategory(category: string) {
//     this.selectedCategory = category;
//     this.applyFilters();
//   }


//   addTask() {
//     alert('Open Add Task Modal here');
//   }

//   editTask(task: any) {
//     alert('Editing: ' + task.title);
//   }

//   deleteTask(id: number) {
//     this.tasks = this.tasks.filter(t => t.id !== id);
//     this.filteredTasks = [...this.tasks];
//   }

// }
