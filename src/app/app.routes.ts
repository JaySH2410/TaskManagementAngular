import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', loadComponent: () => import('./components/tasks-management/tasks-management').then(m => m.TasksManagement) },
  { path: 'tasks/new', loadComponent: () => import('./components/tasks-form/tasks-form').then(m => m.TasksForm) },
  { path: 'tasks/:id/edit', loadComponent: () => import('./components/tasks-form/tasks-form').then(m => m.TasksForm) },
  { path: 'categories/new', loadComponent: () => import('./components/categories-form/categories-form').then(m => m.CategoriesForm) },
];


// export const routes: Routes = [
//   // { path: 'login', component: Login },
//   // { path: 'register', component: Register },
//   { path: '', redirectTo: 'tasks', pathMatch: 'full' },
//   { path: 'tasks', loadComponent: () => import('./components/tasks-management/tasks-management').then(m => m.TasksManagement) },
//   { path: 'tasks/new', loadComponent: () => import('./components/tasks-form/tasks-form').then(m => m.TasksForm)  },
//   { path: 'tasks/:id/edit', loadComponent: () => import('./components/tasks-form/tasks-form').then(m => m.TasksForm)  },
//   { path: 'categories/new', loadComponent: () => import('./components/categories-form/categories-form').then(m => m.CategoriesForm) },
//   { path: '', redirectTo: 'tasks', pathMatch: 'full' }
//   // { path: 'tasks/new', component: TaskFormComponent },
//   // { path: 'tasks/:id/edit', component: TaskFormComponent }
// ];
