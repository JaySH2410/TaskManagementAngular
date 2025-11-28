// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TaskStore } from '../../services/task-store';
// import { TaskSvc } from '../../services/task-svc';
// import { Router } from '@angular/router';
// import { signal } from '@angular/core';
// import { Task, TaskStatus } from '../../models/task';
// import { TaskFormComponent } from '../task-form/task-form';
// import { UIButton } from '../../shared/components/ui-button/ui-button';
// import { UICard } from '../../shared/components/ui-card/ui-card';
// import { UIHeader } from '../../shared/components/ui-header/ui-header';

// @Component({
//   selector: 'app-task-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './task-list.html',
//   styleUrls: ['./task-list.css']
// })
// export class TaskListComponent implements OnInit {
//   store = inject(TaskStore);
//   service = inject(TaskSvc);

//   categories = signal([
//     { id: 1, name: "Work" },
//     { id: 2, name: "Personal" },
//     { id: 3, name: "Urgent" }
//   ]);

//   isFormOpen = signal(false);
//   isDeleteOpen = signal(false);
//   selectedTask = signal<Task | null>(null);
//   deleteId = signal<number | null>(null);

//   ngOnInit() {
//     this.service.getTasks().subscribe(tasks => this.store.setTasks(tasks));
//   }

//   pending = () => this.store.tasks().filter(t => t.status === 'Pending');
//   inProgress = () => this.store.tasks().filter(t => t.status === 'In Progress');
//   done = () => this.store.tasks().filter(t => t.status === 'Done');

//   openCreate() {
//     this.selectedTask.set(null);
//     this.isFormOpen.set(true);
//   }

//   openEdit(task: Task) {
//     this.selectedTask.set(task);
//     this.isFormOpen.set(true);
//   }

//   closeForm() {
//     this.isFormOpen.set(false);
//   }

//   confirmDelete(id: number) {
//     this.deleteId.set(id);
//     this.isDeleteOpen.set(true);
//   }

//   closeDelete() {
//     this.isDeleteOpen.set(false);
//   }

//   deleteTask() {
//     if (this.deleteId()) {
//       this.service.deleteTask(this.deleteId()!).subscribe(() => {
//         this.store.removeTask(this.deleteId()!);
//         this.isDeleteOpen.set(false);
//       });
//     }
//   }
//   search(event: any) {
//     this.store.setSearch(event.target.value);
//   }

//   filterCategory(categoryId: any) {
//     this.store.filterByCategory(categoryId ? Number(categoryId) : null);
//   }

//   filterStatus(status: TaskStatus | 'All') {
//     this.store.filterByStatus(status);
//   }

// }
// // store = inject(TaskStore);
// // service = inject(TaskSvc);
// // router = inject(Router);

// // ngOnInit(): void {
// //   this.service.getTasks().subscribe(tasks => {
// //     this.store.setTasks(tasks);
// //   });
// // }

// // filterStatus(status: string) {
// //   this.store.filterByStatus(status as any);
// // }

// // navigateToAdd() {
// //   this.router.navigate(['/tasks/new']);
// // }

// // edit(id: number) {
// //   this.router.navigate(['/tasks', id, 'edit']);
// // }

// // delete(id: number) {
// //   if (confirm('Delete task?')) {
// //     this.service.deleteTask(id).subscribe(() => this.store.removeTask(id));
// //   }
// // }
